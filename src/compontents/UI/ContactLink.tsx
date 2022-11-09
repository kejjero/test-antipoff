import React from "react";
import style from "../../scss/modules/contactLink.module.scss"

const ContactLink: React.FC<any> = ({children, href, icon}) => (
    <a className={style.contactButton} href={href} >
        <img src={icon} alt=""/>
            {children}
    </a>
)


export default ContactLink;