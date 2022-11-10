import React, {useEffect, useState} from "react";
import {setChangeBase} from "../redux/base/baseSlice";
import {useDispatch, useSelector} from "react-redux";
import TextField from "../compontents/UI/textField/TextField";
import {useForm} from "react-hook-form";
import Form from "../compontents/UI/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {setIsLoggedIn, selectAuth, setIsLoading} from "../redux/auth/authSlice";
import {postUserData, authorize} from "../redux/auth/auth"
import {useNavigate} from "react-router-dom";
import * as yup from "yup";

const Register: React.FC<any> = ({showPopupError}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading} = useSelector(selectAuth);
    const [isErrors, setIsErrors] = useState<boolean>(false)

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

    // проверка на наличие всех ошибок в форме

    useEffect(() => {
        setIsErrors(Object.keys(errors).length !== 0)
    }, [Object.keys(errors).length])

    const registerUser = (name: string, email: string, password: string) => {
        dispatch(setIsLoading(true));
        postUserData(name, email, password)  // запрашивает к api, регистрацию нового пользователя
            .then((res) => {
                if (res) loginUser(email, password);  // авторизовывает нового пользователя при успешном ответе
            })
            .catch((e) => e.json())
            .then((e) => {
                if (e?.message) showPopupError(e.message)
            })
            .catch((e) => console.log(e))
            .finally(() => dispatch(setIsLoading(false)))
    }

    // авторизация
    const loginUser = (email: string, password: string) => {
        dispatch(setIsLoading(true));
        authorize(email, password)
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

    const onSubmit = (data: any) => {
        if (!isErrors) {
            registerUser(data.firstName, data.email, data.password)
            //регистрирует пользователя после пройденной валидации
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
                    checkPassword
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