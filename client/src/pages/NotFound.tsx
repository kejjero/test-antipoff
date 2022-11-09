import style from "../scss/modules/notFound.module.scss"
import {useEffect} from "react";
import {setChangeBase} from "../redux/base/baseSlice";
import {useDispatch} from "react-redux";

const NotFound = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setChangeBase(false))
    },[])

    return (
        <section className={style.notFound}>
            <div className={style.notFound__wrapper}>
                <h2 className={style.notFound__error}>404</h2>
                <p className={style.notFound__text}>Страница не найдена</p>
            </div>
        </section>
    )

}


export default NotFound;