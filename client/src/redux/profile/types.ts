
export interface initialStateProfile {
    profile: ProfileType
    statusProfile: 'loading' | 'success' | 'error'
}

type ProfileType = {
    id: number
    email: string
    avatar: string
    first_name: string
    last_name: string
}