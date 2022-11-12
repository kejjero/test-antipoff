
export interface initialStateForm {
    eyeStatus: boolean
    isLoggedIn: boolean
    isLoading: boolean
    isRegistration: boolean
    userProfile: userType,
    errorPopup: popupType
}

export type userType = {
    email: string
    name: string
}

export type popupType = {
    status: boolean
    text: string,
}