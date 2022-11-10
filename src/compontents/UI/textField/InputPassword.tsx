import React, {forwardRef} from "react";
import {Icons} from "../icons/Icons"
import {selectAuth, setEyeStatus} from "../../../redux/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";

const InputPassword: React.FC<any> = forwardRef((props, ref) => {
    const {error, textError, placeholder="******", onChange} = props
    const {eyeStatus} = useSelector(selectAuth);
    const dispatch = useDispatch()

    const onClickEye = () : void => {
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
                    pattern="^[^\s]+(\s.*)?$" // запрещаем ввод пробелов
                    onChange={(evt) => onChange(evt.target.value)}
                    autocomplete="on"
                    />
                <button type="button" className="textField__eye" onClick={() => onClickEye()}>
                    { eyeStatus ? <Icons.EyeOn/> : <Icons.EyeOff/>}
                </button>
            </div>
            { !!error && <span className="textField__error">{textError}</span> }
        </React.Fragment>
    )
})

export default React.memo(InputPassword);