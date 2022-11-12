import {IPartner} from "../../assets/types";

export interface ICard {
    item: IPartner
    onClick: (id: number) => void;
}
