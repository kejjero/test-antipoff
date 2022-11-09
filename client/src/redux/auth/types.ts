
export interface initialStateForm {
    eyeStatus: boolean
    isLoggedIn: boolean
    isLoading: boolean
    user: userType,
    errorPopup: popupType
}

type userType = {
    email: string
    name: string
}

type popupType = {
    status: boolean
    text: string,
}