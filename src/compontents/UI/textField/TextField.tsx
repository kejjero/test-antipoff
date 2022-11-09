import React, {forwardRef, useState} from "react";
import InputDefault from "./InputDefault";
import InputPassword from "./InputPassword";

const TextField: React.FC<any> = forwardRef((props, ref) => {
    const {label, type} = props;
    const [value, setValue] = useState<string>('')

    const onChangeValue = (value: string) => {
        const validation = value.replace(/\s/g, "")
        setValue(validation)
    }

    return (
        <label className="textField"> {label}
            {
                type === "password" ?
                    <InputPassword {...props} ref={ref} value={value} onChange={onChangeValue}/>
                    :
                    <InputDefault {...props} ref={ref} value={value} onChange={onChangeValue}/>
            }
        </label>
    )
})

export default TextField;