import React, {useEffect} from "react";
import "./scss/app.scss"
import {Header, Main, Footer} from "./compontents"
import {selectAuth, setErrorPopup, setIsLoggedIn, setUser} from "./redux/auth/authSlice";
import {NOTIFICATION_DURATION} from "./utils/constants";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCatalog} from "./redux/catalog/catalogSlice";
import {getCurrentUserInfo} from "./redux/auth/auth";
import {getCurrentWidth} from "./redux/base/baseSlice";

const App: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const {isLoggedIn, errorPopup} = useSelector(selectAuth);
    const {favoritePartners} = useSelector(selectCatalog);
    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    // Получает ширину дисплея для корректного отображения верстки под десктоп и мобайл
    useEffect(() => {
        dispatch(getCurrentWidth(window.screen.width))
    }, [])


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
            getCurrentUserInfo(String(token))
                .then(([response]) => dispatch(setUser(response)))
                .catch((e) => {
                    showPopupError(e.message)
                    dispatch(setIsLoggedIn(false));
                    navigate("/signup");
                })
        }
    }, [token, isLoggedIn, navigate]);

    // активирует попап с ошибкой
    const showPopupError = (text = "Что-то пошло не так"): void => {
        changeContentPopupError(text, true)
        setTimeout(() => changeContentPopupError(text, false), NOTIFICATION_DURATION);
    }

    const changeContentPopupError = (message: string, state: boolean): void => {
        dispatch(setErrorPopup({
            text: message,
            status: state
        }));
    }

    // записывает в localStorage добавленные в избранное партнеров.
    // Сделал по ТЗ без бэка, но лучше передавать такие данные через куки.
    useEffect(() => {
        if (isLoggedIn) {
            const newFavoriteItems = JSON.stringify(favoritePartners);
            localStorage.setItem('partners', newFavoriteItems)
        } else {
            localStorage.removeItem('partners')
        }
    }, [favoritePartners, isLoggedIn])

    return (
        <div className="app">
            <Header/>
            <Main popupError={showPopupError}/>
            <Footer/>
        </div>
    );
}

export default App;
