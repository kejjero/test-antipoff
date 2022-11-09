import React from "react";

interface IButton {
    onClick: any
    children: string
    className: any
    type: "button" | "submit"
}

const Button: React.FC<IButton> = ({onClick, children, className, type}) => {

    return (
        <button
            className={`button ${className}`}
            type={type}
            onClick={() => onClick()}
        >
            {children}
        </button>
    )
}

export default Button;