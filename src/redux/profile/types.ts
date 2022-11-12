import {IPartner} from "../../assets/types";

export interface initialStateProfile {
    profile: IPartner
    statusProfile: 'loading' | 'success' | 'error'
}

