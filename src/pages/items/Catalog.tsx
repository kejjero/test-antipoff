import React, {useEffect, useRef} from "react";
import {fetchTeam} from "../../redux/catalog/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, selectCatalog} from "../../redux/catalog/catalogSlice"
import {PER_PAGE_DESKTOP, PER_PAGE_MOBILE} from "../../utils/constants"
import {getSkeletonCards} from "../../utils/getSkeletonCards"
import {getCards} from "../../utils/getCards"
import {ErrorGetData, Pagination} from "../../compontents"
import {selectBase, setChangeBase} from "../../redux/base/baseSlice";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "../../redux/store";

const Catalog: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {width} = useSelector(selectBase)
    const {currentPage, partners, statusTeam, totalPages} = useSelector(selectCatalog);
    const filterRequest = `page=${currentPage}&per_page=${width > 520 ? PER_PAGE_DESKTOP : PER_PAGE_MOBILE}`
    const cardsRef = useRef<HTMLDivElement>(null);
    const executeScroll = () => cardsRef?.current?.scrollIntoView()

    useEffect(() => {
        dispatch(setChangeBase(true))
    }, [])

    // получает карточки по запросу
    useEffect(() => {
        dispatch(fetchTeam(filterRequest))
        executeScroll()
    }, [currentPage])

    // изменяет индекс текущей страницы с карточками
    const changeCurrentPage = (page: number): void => {
        dispatch(setCurrentPage(page))
    }

    const onClickCard = (profileId: number): void => {
        navigate(`profile/${profileId}`)
    }

    // в catalog__cards не использую ul / li потому что карточка может быть переиспользована
    // в другом месте без списка ul. Думаю правильней будет делать через article

    return (
        <section className="section catalog">
            <div className="catalog__wrapper">
                {
                    statusTeam === 'error' ? <ErrorGetData/>
                        :
                        <div className="catalog__cards" ref={cardsRef}>
                            {
                                statusTeam === 'success' && getCards({items: partners, onClick: onClickCard})
                                ||
                                statusTeam === 'loading' && getSkeletonCards(PER_PAGE_DESKTOP)
                            }
                        </div>
                }
                <Pagination
                    onChange={changeCurrentPage}
                    totalPages={totalPages}
                    forcePage={currentPage - 1}
                />
            </div>
        </section>
    )
}

export default Catalog;