import React from "react"
import ContentLoader from "react-content-loader"
import style from "../../scss/modules/skeleton.module.scss"

const Skeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width="100%"
        height={263}
        viewBox="0 0 305 263"
        backgroundColor="#ededed"
        foregroundColor="#dedede"
        className={style.skeleton}
    >
        <circle cx="50%" cy="95" r="68"/>
        <rect x="auto" y="190" rx="2" ry="2" width="100%" height="24"/>
    </ContentLoader>
)

export default Skeleton;