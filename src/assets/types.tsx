
export interface IPartner {
    id: number
    email: string
    avatar: string
    firstName: string
    lastName: string
}

export interface IApi {
    data: any
    page: number
    per_page: number
    support: object
    total: number
    total_pages: number
}

export interface IPartnerApi {
    id: number
    email: string
    avatar: string
    first_name: string
    last_name: string
}

export type userInfoType = {
    name: string
    email: string
    password: string
}

export type authInfoType = {
    password: string
    email: string
}

export type tokenType = string
