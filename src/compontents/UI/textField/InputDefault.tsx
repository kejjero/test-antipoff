import React, {forwardRef} from "react";
import {IInput} from "../types";

// возникли сложности с типизацией двойного forwardRef.
// С одним рефом некорректно работает валидация формы из-за вложенности 2 компонентов
const InputDefault: React.FC<any> = forwardRef((props, ref) => {
    const {error, textError, onChange} = props;

    return(
        <React.Fragment>
            <input
                {...props}
                ref={ref}
                className={`textField__input ${!!error && "textField__input_error"}`}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChange(evt.target.value)}
                autoComplete="on"
                pattern="^[^\s]+(\s.*)?$" // запрещаем ввод пробелов
            />
            {
                !!error &&
                <span className="textField__error">{textError}</span>
            }
        </React.Fragment>
    )
})

export default React.memo(InputDefault);