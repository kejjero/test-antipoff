import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={305}
        height={263}
        viewBox="0 0 305 263"
        backgroundColor="#ededed"
        foregroundColor="#dedede"
    >
        <rect x="20" y="301" rx="3" ry="3" width="155" height="32" />
        <rect x="203" y="301" rx="3" ry="3" width="32" height="32" />
        <circle cx="127" cy="95" r="68" />
        <rect x="70" y="178" rx="2" ry="2" width="117" height="24" />
    </ContentLoader>
)

export default Skeleton;