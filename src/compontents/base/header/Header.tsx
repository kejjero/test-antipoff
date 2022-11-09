import Button from "../../UI/Button";
import style from "../../../scss/modules/navButton.module.scss"
import {selectBase} from "../../../redux/base/baseSlice"
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HeaderCatalog, HeaderProfile} from "../../index"
import {setIsLoggedIn, setUser} from "../../../redux/auth/authSlice";
import {CLEAR_USER} from "../../../utils/constants";

const Header = () => {
    const {activeBase} = useSelector(selectBase)
    const location = useLocation();
    const isProfile = location.pathname.split("/").some(item => item === 'profile'); // определяет страницу с профилем
    const dispatch = useDispatch()

    // Удаляет токен и очищает профиль пользователя
    const onClickLogoutButton = () => {
        localStorage.removeItem("token");
        dispatch(setIsLoggedIn(false))
        dispatch(setUser(CLEAR_USER))
    }

    // По необходимости аннулируется хедер в нужных нам секциях
    if (!activeBase) {
        return <header></header>
    }

    return (
        <header className="header">
            <div className="header__wrapper">
                <nav className={`header__nav ${!isProfile ? "header__nav_back" : ""}`}>
                    {
                        isProfile &&
                        <Link to="/">
                            <Button type="button" className={style.navButton}>
                                Назад
                            </Button>
                        </Link>
                    }
                    <Link to="/signup">
                        <Button type="button" onClick={onClickLogoutButton} className={style.navButton}>
                            Выход
                        </Button>
                    </Link>
                </nav>
                {
                    isProfile ?
                        <HeaderProfile/>
                        :
                        <HeaderCatalog/>
                }
            </div>
        </header>
    )
}
export default Header;