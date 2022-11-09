import {useEffect} from "react";
import {setChangeBase} from "../redux/base/baseSlice";
import {selectProfile} from "../redux/profile/profileSlice"
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchProfile} from "../redux/profile/asyncActions"
import ContactLink from "../compontents/UI/ContactLink";
import {ICONS_CONTACT} from "../utils/constants"
import React from "react";
import {ErrorGetData} from "../compontents";

const Profile = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {profile, statusProfile} = useSelector(selectProfile);
    let currentId: string | string[] = location.pathname.split("/");
    currentId = currentId[currentId.length - 1];

    useEffect(() => {
        dispatch(fetchProfile(currentId))
        dispatch(setChangeBase(true))
    }, [])

    // К сожалению api из ТЗ не возвращает текст и номер телефона, пришлось параграф сделать вставкой из макета.
    // Не стал мудрить, но по необходимости могу что-нибудь придумать :)

    return (
        <section className="profile">
            {
                statusProfile === "error" ? <ErrorGetData/>
                    :
                    <div className="profile__wrapper">
                        <div className="profile__about">
                            <p className="profile__paragraph">
                                Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых
                                продуктов, включая такие аспекты, как организационная структура, процессы,
                                аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру
                                рисков их бизнеса, улучшать процессы за счет применения новейших технологий
                                и увеличивать продажи, используя самые современные аналитические инструменты.
                            </p>
                            <p className="profile__paragraph">
                                В работе с клиентами недостаточно просто решить конкретную проблему или помочь
                                справиться с трудностями. Не менее важно уделять внимание обмену знаниями:
                                "Один из самых позитивных моментов — это осознание того, что ты помог клиенту
                                перейти на совершенно новый уровень компетентности, уверенность в том, что после
                                окончания проекта у клиента есть все необходимое, чтобы дальше развиваться
                                самостоятельно".
                            </p>
                            <p className="profile__paragraph">
                                Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
                                предпринимательскую деятельность. Он является совладельцем сети клиник эстетической
                                медицины в Швейцарии, предлагающей инновационный подход к красоте, а также
                                инвестором других бизнес-проектов.
                            </p>
                        </div>
                        <div className="profile__contacts">
                            <ContactLink href="tel: +79543334455" icon={ICONS_CONTACT.phone}>
                                +7 (954) 333-44-55
                            </ContactLink>
                            <ContactLink href={`mailto: ${profile.email}`} icon={ICONS_CONTACT.email}>
                                {profile.email}
                            </ContactLink>
                        </div>
                    </div>
            }
        </section>
    )
}
export default Profile;