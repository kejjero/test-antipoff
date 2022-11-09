import {Card} from "../compontents"

export const getCards = (obj: any) => obj.items.map((item: any) => (
        <Card onClick={obj.onClick} key={item.id} item={item}/>
    )
)
