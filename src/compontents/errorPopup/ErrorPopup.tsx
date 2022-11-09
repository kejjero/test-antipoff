import React from "react";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/auth/authSlice";

const ErrorPopup:React.FC<any> = () => {
    const {errorPopup} = useSelector(selectAuth)
    return (
        <div className={`errorPopup ${errorPopup.status ? "errorPopup_visible" : ""}`}>
            <p className="errorPopup__text">{errorPopup.text}</p>
        </div>
    );
};

export default ErrorPopup;