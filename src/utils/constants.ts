import clearPhoto from "../images/clearPhoto.jpeg"

// Количество карточек на страницу
export const PER_PAGE_DESKTOP = 8
export const PER_PAGE_MOBILE = 4


// Шаблон пустого профиля
export const CLEAR_PROFILE = {
    id: 0,
    email: '',
    avatar: clearPhoto,
    first_name: '',
    last_name: ''
}

// Шаблон отсутствия пользователя
export const CLEAR_USER = {
    name: "",
    email: "",
}

// Задержка попапа с ошибкой
export const NOTIFICATION_DURATION = 2500