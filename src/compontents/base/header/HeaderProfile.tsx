import {useSelector} from "react-redux";
import {selectProfile} from "../../../redux/profile/profileSlice"

const HeaderProfile = () => {
    const {profile} = useSelector(selectProfile)

    return(
        <div className="header__profile">
            <img className="header__avatar" src={profile.avatar} alt=""/>
            <div className="header__profile-wrapper">
                <h1 className="header__title header__title_profile">{profile.firstName}</h1>
                <em className="header__status">Партнер</em>
            </div>
        </div>
    )
}

export default HeaderProfile;