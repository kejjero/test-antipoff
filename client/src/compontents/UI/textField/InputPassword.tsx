import React, {forwardRef, useState} from "react";
import {ICONS_EYE} from "../../../utils/constants"
import {selectAuth, setEyeStatus} from "../../../redux/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

const InputPassword: React.FC<any> = forwardRef((props, ref) => {
    const {error, textError, placeholder="******", onChange} = props
    const {eyeStatus} = useSelector(selectAuth);
    const dispatch = useDispatch()

    const onClickEye = () => {
        dispatch(setEyeStatus())
    }

    return(
        <React.Fragment>
            <div className="textField__password">
                <input
                    ref={ref}
                    {...props}
                    type={eyeStatus ? "text" : "password"}
                    className={`textField__input textField__input_password ${!!error && "textField__input_error"}`}
                    placeholder={placeholder}
                    pattern="^[^\s]+(\s.*)?$"
                    onChange={(evt) => onChange(evt.target.value)}
                    autocomplete="off"
                    />
                <img
                    className="textField__eye"
                    src={eyeStatus ? ICONS_EYE.on : ICONS_EYE.off}
                    alt="глаз"
                    onClick={() => onClickEye()}
                />
            </div>
            { !!error && <span className="textField__error">{textError}</span> }
        </React.Fragment>
    )
})

export default InputPassword;