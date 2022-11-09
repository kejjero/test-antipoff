import React, {useState} from "react";
import LikeButton from "../UI/LikeButton"

const Card: React.FC<any> = ({item, onClick}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const onClickButton = (evt: any) => {
        evt.stopPropagation();
        setIsLiked(!isLiked)
    }

    return(
        <article className="card" onClick={() =>onClick(item.id)}>
            <div className="card__wrapper">
                <img className="card__avatar" src={item.avatar} alt={item.first_name}/>
                <h2 className="card__name">{item.first_name}</h2>
            </div>
            <LikeButton onClick={onClickButton} isLiked={isLiked}/>
        </article>
    )
}

export default Card;