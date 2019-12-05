import {IUser} from "./User";

export enum VoteType {
    up,
    down
}

export interface IVote {
    voteType: VoteType
    author: IUser
}
