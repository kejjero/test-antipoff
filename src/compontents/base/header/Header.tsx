import Button from "../../UI/Button";
import style from "../../../scss/modules/navButton.module.scss"
import {selectBase, selectWidth, getCurrentWidth} from "../../../redux/base/baseSlice"
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {HeaderCatalog, HeaderProfile} from "../../index"
import {selectAuth, setIsLoggedIn, setUser} from "../../../redux/auth/authSlice";
import {CLEAR_USER} from "../../../utils/constants";
import React, {useEffect} from "react";
import {Icons} from "../../UI/icons/Icons"
import {resetFavorites} from "../../../redux/catalog/catalogSlice";

const Header: React.FC = () => {
    const {activeBase} = useSelector(selectBase)
    const {userProfile} = useSelector(selectAuth)
    const location = useLocation();
    const isProfile = location.pathname.split("/").some(item => item === 'profile'); // определяет страницу с профилем
    const dispatch = useDispatch();
    const width = useSelector(selectWidth);

    // Удаляет токен, избранное и очищает профиль пользователя
    const onClickLogoutButton = (): void => {
        localStorage.removeItem("token");
        dispatch(setIsLoggedIn(false))
        dispatch(setUser(CLEAR_USER))
        dispatch(resetFavorites())
    }

    // Сбрасывает хедер на нужных нам страницах (для сохранения симантики)
    if (!activeBase) {
        return <header/>
    }

    return (
        <header className="header">
            <div className="header__wrapper">
                <nav className={`header__nav ${!isProfile ? "header__nav_back" : ""}`}>
                    {
                        isProfile &&
                        <Link to="/test-antipoff">
                            <Button type="button" className={width > 520 ? style.navButton : ''}>
                                { width > 520 ? 'Назад' : <Icons.Back/> }
                            </Button>
                        </Link>
                    }
                    <div className="header__button-group">
                        {userProfile.name && <p className="header__user">
                            <Icons.User/> <span className="header__user-info">{userProfile.name}</span>
                        </p>}
                        <Link to="/signup">
                            <Button
                                type="button"
                                onClick={() => onClickLogoutButton()}
                                className={width > 520 ? style.navButton : ''}
                            >
                                { width > 520 ? 'Выйти' : <Icons.Exit/> }
                            </Button>

                        </Link>
                    </div>
                </nav>
                {isProfile ? <HeaderProfile/> : <HeaderCatalog/>}
            </div>
        </header>
    )
}
export default React.memo(Header);