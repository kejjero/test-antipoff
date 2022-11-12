import React from "react";
import style from "../../scss/modules/contactLink.module.scss"
import {IContactLink} from "./types";

const ContactLink: React.FC<IContactLink> = ({children, href, icon}) => (
    <a className={style.contactButton} href={href}>
        {icon}
        <span className={style.contactButton__text}>{children}</span>
    </a>
)


export default React.memo(ContactLink);