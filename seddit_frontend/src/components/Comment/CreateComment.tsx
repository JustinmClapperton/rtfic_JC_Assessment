import React from "react";
import {ICommentable} from "../../models/Commentable";
import {IComment} from "../../models/Comment";
import {IUser} from "../../models/User";
import "./CreateComment.css"

interface ICreateCommentProps {
    author: IUser
    parent: ICommentable
    createComment: (comment: IComment) => void
    isReply: boolean
}

interface ICreateCommentState {
    content: string
}

class CreateComment extends React.Component<ICreateCommentProps, ICreateCommentState> {

    constructor(props: ICreateCommentProps) {
        super(props);
        this.state = { content: ""}
    }

    private handleCommentInput = (event: any) => {
        this.setState({
            content: event.target.value
        })
    }

    private createComment = () => {
        if (this.state.content === "") {
            alert("Please add some content")
        } else {
            let comment: IComment = {comment: this.state.content, author: this.props.author, comments: []}
            this.props.createComment(comment)
            this.setState({
                content: ""
            })
        }
    }

    render() {
        return (
            <div className={"CreateComment"}>
                <label>
                    { this.props.isReply ? "Add Reply" : "Add Comment" }
                </label>
                <br/>
                <textarea rows={10} cols={100} className={"commentContentField"} value={this.state.content} onChange={this.handleCommentInput}/>
                <br/>
                <button onClick={this.createComment}>{ this.props.isReply ? "Reply" : "Comment" }</button>
            </div>
        );
    }
}

export {
    CreateComment
}
