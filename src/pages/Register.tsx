import React, {useEffect} from "react";
import {setChangeBase} from "../redux/base/baseSlice";
import {useDispatch, useSelector} from "react-redux";
import TextField from "../compontents/UI/textField/TextField";
import {useForm} from "react-hook-form";
import Form from "../compontents/UI/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SCHEMA_REGISTER} from "../utils/constants"
import {setIsLoggedIn, selectAuth, setIsLoading} from "../redux/auth/authSlice";
import {postUserData, authorize} from "../redux/auth/auth"
import {useNavigate} from "react-router-dom";

const Register: React.FC<any> = ({showPopupError}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading} = useSelector(selectAuth)

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(SCHEMA_REGISTER)
    });

    // проверка на наличие всех ошибок в форме
    const isErrors = Object.keys(errors).length !== 0;

    // регистрация пользователя
    const registerUser = (name: string, email: string, password: string) => {
        // setIsLoading(true);
        postUserData(name, email, password)
            .then((res) => {
                if (res) {
                    loginUser(email, password);

                }
            })
            .catch((e) => e.json())
            .then((e) => {
                if (e?.message) {
                    showPopupError(e.message)
                }
            })
            .catch((e) => console.log(e))
            .finally(() => dispatch(setIsLoading(false)))
    }

    // авторизация
    const loginUser = (email: string, password: string) => {
        // setIsLoading(true);
        authorize(email, password)
            .then((data) => {
                if (data.token) {
                    dispatch(setIsLoggedIn(true));
                    navigate("/");
                    // setUnauthPageMessage("");
                }
            })
            .catch((e) => e.json())
            .then((e) => {
                if (e?.message) {
                    // setUnauthPageMessage(e.message);
                }
                dispatch(setIsLoggedIn(false));
            })
            .catch((e) => console.log(e))
            // .finally(() => setIsLoading(false));
    }

    // отправка формы
    const onSubmit = (data: any) => {
        if (!isErrors) {
            // dispatch(setIsLoggedIn(true))
            registerUser(data.firstName, data.email, data.password)

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