import phone from "../images/phone.svg"
import email from "../images/email.svg"
import clearPhoto from "../images/clearPhoto.jpeg"
import eyeOn from "../images/eyeOn.svg"
import eyeOff from "../images/eyeOff.svg"
import * as yup from "yup";

// количество карточек на страницу
export const PER_PAGE_DESKTOP = 8
export const PER_PAGE_MOBILE = 4

// Иконки для профиля
export const ICONS_CONTACT = {
    phone,
    email
}

// Иконки глаза для поля с паролем
export const ICONS_EYE = {
    on: eyeOn,
    off: eyeOff
}

// Шаблон пустого профиля
export const CLEAR_PROFILE = {
    id: 0,
    email: '',
    avatar: clearPhoto,
    first_name: '',
    last_name: ''
}

// Схема валидации для формы регистрации

export const SCHEMA_REGISTER = yup.object().shape({
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

export const CLEAR_USER = {
    name: "",
    email: "",
}

// Задержка попапа с ошибкой
export const NOTIFICATION_DURATION = 2500