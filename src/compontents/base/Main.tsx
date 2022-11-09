import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import ProtectedRoute from "../protectedRoute/ProtectedRoute"
import {Catalog, NotFound, Profile, Register} from "../../pages";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {selectAuth, setIsLoggedIn, setUser, setErrorPopup} from "../../redux/auth/authSlice";
import {getCurrentUserInfo} from "../../redux/auth/auth";
import {NOTIFICATION_DURATION} from "../../utils/constants"
import ErrorPopup from "../errorPopup/ErrorPopup";

const Main = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const {isLoggedIn, errorPopup} = useSelector(selectAuth);
    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    // Если получен токен, пользователя перебрасывает на главную страницу
    useEffect(() => {
        if (token && !errorPopup.status) {
            dispatch(setIsLoggedIn(true));
            if (location.pathname === "/signup") {
                navigate("/");
            } else {
                navigate(location.pathname);
            }
        }
    }, [token, isLoggedIn, navigate, location.pathname]);

    // Если пользователь авторизован, запрашиваем данные текущего пользователя
    useEffect(() => {
        if (isLoggedIn) {
            getCurrentUserInfo(token)
                .then(([response]) => dispatch(setUser(response)))
                .catch((e) => {
                    showPopupError(e.message)
                    dispatch(setIsLoggedIn(false));
                    navigate("/signup");
                })
        }
    }, [token, isLoggedIn, navigate]);

    const showPopupError = (text = "Что-то пошло не так") => {
        dispatch(setErrorPopup({
            text: text,
            status: true
        }));
        setTimeout(() => dispatch(setErrorPopup({text: text, status: false})), NOTIFICATION_DURATION);
    }

    return (
        <main className="content">
            <Routes>
                <Route path="/signup" element={<Register showPopupError={showPopupError}/>}/>
                <Route path="/" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Catalog/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <ErrorPopup/>
        </main>
    )
}
export default Main;