import {IUser} from "./User";

export interface IArticle {
    title: string
    content: string
    author: IUser
}
