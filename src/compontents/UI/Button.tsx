import React from "react";
import {IButton} from "./types";

const Button: React.FC<IButton> = ({onClick, children, className, type}) => (
    <button className={`button ${className}`} type={type} onClick={onClick}>
        {children}
    </button>
)


export default React.memo(Button);