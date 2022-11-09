import React, {forwardRef} from "react";

const InputDefault: React.FC<any> = forwardRef((props, ref) => {
    const {error, textError, onChange} = props;

    return(
        <React.Fragment>
            <input
                ref={ref}
                {...props}
                className={`textField__input ${!!error && "textField__input_error"}`}
                onChange={(evt) => onChange(evt.target.value)}
                autocomplete="[on]"
            />
            {
                !!error &&
                <span className="textField__error">{textError}</span>
            }
        </React.Fragment>
    )
})

export default InputDefault;