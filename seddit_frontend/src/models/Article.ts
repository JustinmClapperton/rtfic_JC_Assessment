import {IUser} from "./User";
import {IVote} from "./Vote";
import {ICommentable} from "./Commentable";

export interface IArticle extends ICommentable{
    title: string
    content: string
    author: IUser
    votes: IVote[]
}
