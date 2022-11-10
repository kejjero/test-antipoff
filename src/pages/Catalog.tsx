import React, {useEffect} from "react";
import {fetchTeam} from "../redux/catalog/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, selectCatalog} from "../redux/catalog/catalogSlice"
import {PER_PAGE_DESKTOP} from "../utils/constants"
import {getSkeletonCards} from "../utils/getSkeletonCards"
import {getCards} from "../utils/getCards"
import {ErrorGetData, Pagination} from "../compontents"
import {setChangeBase} from "../redux/base/baseSlice";
import {useNavigate} from "react-router-dom";

const Catalog: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentPage, partners, statusTeam, totalPages} = useSelector(selectCatalog);
    const filterRequest = `page=${currentPage}&per_page=${PER_PAGE_DESKTOP}`;

    useEffect(() => {
        dispatch(setChangeBase(true))
    }, [])

    // получает карточки по запросу
    useEffect(() => {
        dispatch(fetchTeam(filterRequest))
    }, [currentPage])

    // изменяет индекс текущей страницы с карточками
    const changeCurrentPage = (page: number): void => {
        dispatch(setCurrentPage(page))
    }

    const onClickCard = (profileId: number): void => {
        navigate(`profile/${profileId}`)
    }

    return (
        <section className="section catalog">
            <div className="catalog__wrapper">
                {
                    statusTeam === 'error' ? <ErrorGetData/>
                        :
                        <div className="catalog__cards">
                            {
                                statusTeam === 'success' && getCards({items: partners, onClick: onClickCard})
                                ||
                                statusTeam === 'loading' && getSkeletonCards(PER_PAGE_DESKTOP)
                            }
                        </div>
                }
                <Pagination
                    statusCards={statusTeam}
                    onChange={changeCurrentPage}
                    totalPages={totalPages}
                    forcePage={currentPage - 1}
                />
            </div>
        </section>
    )
}

export default Catalog;