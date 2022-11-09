
export interface IProtectedRoute {
    children: JSX.Element
    isLoggedIn: boolean
    auth?: boolean

}