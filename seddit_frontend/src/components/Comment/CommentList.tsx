import React from "react";
import {CommentListItem} from "./CommentListItem";
import {IComment} from "../../models/Comment";
import {IUser} from "../../models/User";


interface ICommentListProps {
    comments: IComment[]
    user: IUser
    handleCreateComment: (comment: IComment, idx: number) => void
}

interface ICommentListState {

}

class CommentList extends React.Component<ICommentListProps, ICommentListState> {


    render() {
        return (
            <div>
                { this.props.comments.map((comment, idx) => {
                    return (
                        <div>
                            <CommentListItem commentIdx={idx} comment={comment} user={this.props.user} createComment={this.props.handleCreateComment}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export {
    CommentList
}
