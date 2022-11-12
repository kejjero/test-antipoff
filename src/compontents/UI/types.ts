import React, {LegacyRef} from "react";


export interface ILikeButton {
    isLiked: boolean
    onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IForm {
    children: JSX.Element | JSX.Element[]
    onSubmit: () => void
    title: string
}

export interface IContactLink {
    children: string
    href: string
    icon: JSX.Element
}

export interface IButton {
    onClick?: () => void
    children: string | JSX.Element
    className: string
    type: "button" | "submit"
}

export interface ITextField {
    type?: string
    error?: boolean
    label?: string
    name?: string
    textError?: any
    placeholder?: string
    ref?: any
}


export interface IInput {
    ref?: any
    type?: string
    error?: boolean
    label?: string
    name?: string
    textError?: any
    placeholder?: string
    onChange: (value: string) => void
    value: string
}