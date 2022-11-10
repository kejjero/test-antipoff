import React from "react";
import style from "../../scss/modules/contactLink.module.scss"

const ContactLink: React.FC<any> = ({children, href, icon}) => (
    <a className={style.contactButton} href={href}>
        {icon}
        <span className={style.contactButton__text}>{children}</span>
    </a>
)


export default ContactLink;