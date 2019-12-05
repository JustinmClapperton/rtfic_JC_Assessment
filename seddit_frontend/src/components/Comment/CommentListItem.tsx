import React from "react";
import {IComment} from "../../models/Comment";
import { CreateComment } from "./CreateComment";
import {IUser} from "../../models/User";
import { CommentList } from "./CommentList";
import "./CommentListItem.css"

interface ICommentListItemProps {
    comment: IComment
    user: IUser
    createComment: (comment: IComment, idx: number) => void
    commentIdx: number
}

interface ICommentListItemState {
    isReplying: boolean
}

class CommentListItem extends React.Component<ICommentListItemProps, ICommentListItemState> {

    constructor(props: ICommentListItemProps) {
        super(props);
        this.state = { isReplying: false }
    }


    private replyToComment = () => {
        this.setState({
            isReplying: !this.state.isReplying
        })
    }

    private createComment = (comment: IComment, idx: number = -1) => {
        let parentComment = this.props.comment
        if (comment.comments.length > 0) {
            parentComment.comments[idx] = comment
        } else {
            parentComment.comments.push(comment)
        }
        this.props.createComment(parentComment, this.props.commentIdx)
        this.setState({
            isReplying: false
        })
    }

    render() {
        return (
            <div className={"CommentListItem"}>
                <label className={"CommentAuthor"}>Reply by{this.props.comment.author.username}</label>
                <br/>
                <label className={"CommentContent"}>{this.props.comment.comment}</label>
                <br/>
                <label className={"CommentReplies"}>Replies: {this.props.comment.comments.length}</label>
                {!this.state.isReplying && <button onClick={this.replyToComment}>{ this.state.isReplying ? "Cancel" : "Reply" }</button>}
                {this.state.isReplying && <CreateComment isReply={true} author={this.props.user} parent={this.props.comment} createComment={this.createComment}/>}
                <CommentList comments={this.props.comment.comments} user={this.props.user} handleCreateComment={this.createComment}/>
            </div>
        );
    }
}
export {
    CommentListItem
}
