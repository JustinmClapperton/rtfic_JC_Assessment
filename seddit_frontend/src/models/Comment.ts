import {IUser} from "./User";
import {ICommentable} from "./Commentable";

export interface IComment extends ICommentable{
    comment: string
    author: IUser
}
