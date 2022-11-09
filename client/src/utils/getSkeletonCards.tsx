import {Skeleton} from "../compontents";
import React from "react";

export const getSkeletonCards = (pages: number) => (
    [...new Array(pages)].map((_, i) => (
            <Skeleton key={i}/>
        )
    )
)
