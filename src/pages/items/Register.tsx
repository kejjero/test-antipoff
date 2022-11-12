import React, {useEffect, useState} from "react";
import {setChangeBase} from "../../redux/base/baseSlice";
import {useDispatch, useSelector} from "react-redux";
import TextField from "../../compontents/UI/textField/TextField";
import {FieldValues, useForm} from "react-hook-form";
import Form from "../../compontents/UI/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {setIsLoggedIn, selectAuth, setIsLoading} from "../../redux/auth/authSlice";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {postUserData, authorize} from "../../redux/auth/auth"
import {IRegister} from "../types";
import {authInfoType, userInfoType} from "../../assets/types";

const Register: React.FC<IRegister> = ({showPopupError}) => {
    const [isErrors, setIsErrors] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading} = useSelector(selectAuth);

    // Схема валидации для формы регистрации
    const Schema = yup.object().shape({
        firstName: yup.string()
            .required("Вы не заполнили")
            .matches(/^[a-zа-яё]+$/i, 'Некорректное имя'),
        email: yup.string()
            .required("Вы не заполнили")
            .email('Некорректная электронная почта'),
        password: yup.string()
            .required("Вы не заполнили")
            .matches(/[A-Z].*[0-9].*[0-9]/, 'Убедитесь, что пароль содержит 1 заглавную букву и 2 цифры'),
        passwordReplay: yup.string()
            .required("Вы не заполнили")
            .oneOf([yup.ref('password')], 'Пароли не совпадают')
    })

    // хук валидации формы
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(Schema)
    });

    // проверяет на наличие всех ошибок в форме
    const existErrors = Object.keys(errors).length
    useEffect(() => {
        setIsErrors(existErrors !== 0)
    }, [existErrors])


    const registerUser = (userData: userInfoType) => {
        dispatch(setIsLoading(true));
        postUserData(userData)  // запрашивает к api, регистрацию нового пользователя
            .then((res) => {
                if (res) loginUser({email: userData.email, password: userData.password});  // авторизовывает нового пользователя при успешном ответе
            })
            .catch((e) => e.json())
            .then((e) => {
                if (e?.message) showPopupError(e.message)
            })
            .catch((e) => console.log(e))
            .finally(() => dispatch(setIsLoading(false)))
    }


    // авторизация
    const loginUser = (data: authInfoType) => {
        dispatch(setIsLoading(true));
        authorize(data)
            .then((data) => {
                if (data.token) {
                    dispatch(setIsLoggedIn(true));
                    navigate("/");
                }
            })
            .catch((e) => e.json())
            .then((e) => {
                if (e?.message) showPopupError(e.message);
                dispatch(setIsLoggedIn(false));
            })
            .catch((e) => console.log(e))
            .finally(() => setIsLoading(false));
    }

    const onSubmit = (data: FieldValues) => {
        if (!isErrors) {
            //регистрирует пользователя после пройденной валидации
            registerUser({
                name: data.firstName,
                email: data.email,
                password: data.password
            })
        }
    }

    useEffect(() => {
        dispatch(setChangeBase(false))
    }, [])

    return (
        <section className="register">
            <Form title="Регистрация" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Имя"
                    placeholder="Артем"
                    type="text"
                    error={!!errors.firstName}
                    textError={errors?.firstName?.message}
                    {...register("firstName")}
                />
                <TextField
                    label="Электронная почта"
                    placeholder="example@mail.ru"
                    type="email"
                    error={!!errors.email}
                    textError={errors?.email?.message}
                    {...register("email")}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    error={!!errors.password}
                    textError={errors?.password?.message}
                    {...register("password")}
                />
                <TextField
                    label="Подтвердите пароль"
                    type="password"
                    error={!!errors.passwordReplay}
                    textError={errors?.passwordReplay?.message}
                    {...register("passwordReplay")}
                />
                <button
                    type="submit"
                    className={`form__submit ${isErrors && "form__submit_disabled"}`}
                    disabled={isLoading}
                >
                    Зарегистрироваться
                </button>
            </Form>
        </section>
    )
}

export default React.memo(Register);