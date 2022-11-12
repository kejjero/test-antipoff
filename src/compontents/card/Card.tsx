import React, {useEffect, useState} from "react";
import LikeButton from "../UI/LikeButton"
import {useDispatch, useSelector} from "react-redux";
import {selectCatalog, postFavoritePartner, deleteFavoritePartner} from "../../redux/catalog/catalogSlice"
import {ICard} from "./types";
import {IPartner} from "../../assets/types";

const Card: React.FC<ICard> = ({item, onClick}) => {
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const {favoritePartners} = useSelector(selectCatalog)
    const isFavorite = favoritePartners.some((favorite: IPartner) => favorite.id === item.id)

    useEffect(() => {
        if (isFavorite) {
            setIsLiked(true)
        }
    }, [])

    const handleIsFavorite = (): boolean => {
        if (!isFavorite) {
            dispatch(postFavoritePartner(item))
            return true
        }
        const withoutItemsFavorite = favoritePartners.filter((favorite: IPartner) => favorite.id !== item.id)
        dispatch(deleteFavoritePartner(withoutItemsFavorite))
        return false
    }

    const onClickFavoriteButton = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.stopPropagation() // останавливает всплытие по кнопке
        setIsLiked(handleIsFavorite())
    }

    return (
        <article className="card" onClick={() => onClick(item.id)}>
            <div className="card__wrapper">
                <img className="card__avatar" src={item.avatar} alt={item.firstName}/>
                <h2 className="card__name">{item.firstName}</h2>
            </div>
            <LikeButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClickFavoriteButton(e)}
                isLiked={isLiked}
            />
        </article>
    )
}

export default Card;