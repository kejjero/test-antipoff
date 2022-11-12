import React from "react";
import style from "../../scss/modules/likeButton.module.scss"
import {ILikeButton} from "./types";

const LikeButton: React.FC<ILikeButton> = ({isLiked, onClick}) => {

    return (
        <button
            className={style.likeButton}
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => onClick(evt)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14"
                fill={isLiked ? "#512689" : "none"}
            >
                <path
                    stroke={isLiked ? "none" : "#151317"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.85 1C2.7238 1 1 2.7217 1 4.8455 1 8.691 5.55 12.1869 8 13c2.45-.8131 7-4.309 7-8.1545C15 2.7217 13.2762 1 11.15 1 9.848 1 8.6965 1.6457 8 2.634a3.8441 3.8441 0 0 0-1.375-1.2017A3.8492 3.8492 0 0 0 4.85 1Z"
                />
            </svg>
        </button>
    )
}

export default React.memo(LikeButton);