import Button from "../../UI/Button";
import style from "../../../scss/modules/navButton.module.scss"
import {selectBase} from "../../../redux/base/baseSlice"
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {HeaderCatalog, HeaderProfile} from "../../index"

const Header = () => {
    const {activeBase} = useSelector(selectBase)
    const navigate = useNavigate();
    const location = useLocation();
    const isProfile = location.pathname.split("/").some(item => item === 'profile');

    const onClickBackButton = () => {
        navigate('/')
    }

    const onClickLogoutButton = () => {
    }

    if (!activeBase) {
        return <header></header>
    }

    return (
        <header className="header">
            <div className="header__wrapper">
                <nav className={`header__nav ${!isProfile ? "header__nav_back" : ""}`}>
                    {
                        isProfile &&
                        <Button
                            type="button"
                            onClick={onClickBackButton}
                            className={style.navButton}
                        >
                            Назад
                        </Button>
                    }
                    <Button
                        type="button"
                        onClick={onClickLogoutButton}
                        className={style.navButton}
                    >
                        Выход
                    </Button>
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