import style from "../../scss/modules/errorGetData.module.scss"
import React from "react";

const ErrorGetData: React.FC = () => {
    return(
        <article className={style.error}>
            <h2 className={style.error__title}>Не удалось получить данные 😕</h2>
            <p className={style.error__text}>Пожалуйста, попробуйте повторить запрос.</p>
        </article>
    )
}

export default ErrorGetData;