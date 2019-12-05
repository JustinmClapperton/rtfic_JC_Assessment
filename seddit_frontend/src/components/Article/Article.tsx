import React from "react";
import { IArticle } from "../../models/Article";
import { VoteType } from "../../models/Vote";
import { CreateComment } from "../Comment/CreateComment";
import './ArticleListItem.css'
import {IComment} from "../../models/Comment";
import { CommentList } from "../Comment/CommentList";
import { CommentListItem } from "../Comment/CommentListItem";
import {IUser} from "../../models/User";
import "./Article.css"

interface IArticleProps {
    handleVote: (article: IArticle, idx:number) => void
    handleCreateComment: (article: IArticle, idx: number) => void
    article: IArticle
    idx: number
    user: IUser
    back: () => void
}

interface IArticleState {
}

class Article extends React.Component<IArticleProps, IArticleState> {

    private handleCreateComment = (comment: IComment, idx= -1) => {
        let article = this.props.article
        if ( idx >= 0) {
            article.comments[idx] = comment
        } else {
            article.comments.push(comment)
        }
        this.props.handleCreateComment(article, this.props.idx)
    }

    private handleVote = (event: any) => {
        const voteType = event.target.name
        let article = this.props.article
        if (voteType === "upVote") {
            article.votes.push({voteType: VoteType.up, author: this.props.article.author})
        } else {
            article.votes.push({voteType: VoteType.down, author: this.props.article.author})
        }
        this.props.handleVote(article, this.props.idx)
    }

    render() {
        return (
            <div className={"Article"}>
                <a onClick={this.props.back} className={"BackButton"}> &lt; Back to Articles</a>
                <br/><br/>
                <label className={"ArticleAuthor"}>posted by: {this.props.article.author.username}</label>
                <br/>
                <label className={"ArticleTitle"}>
                    {this.props.article.title}
                </label>
                <br/>
                <div className={"ArticleContent"}>{this.props.article.content}</div>
                <br/>
                Up Votes: {`${this.props.article.votes.filter( vote => vote.voteType === VoteType.up).length} `}
                Down Votes: {`${this.props.article.votes.filter( vote => vote.voteType === VoteType.down).length} `}
                Comments: {this.props.article.comments.length}
                <br/>
                <button name={"upVote"} onClick={this.handleVote}>Up Vote</button>
                <button name={"downVote"} onClick={this.handleVote}>Down Vote</button>
                <br/>
                <br/>
                <br/>
                <CreateComment isReply={false} parent={this.props.article} author={this.props.article.author} createComment={this.handleCreateComment}/>
                { this.props.article.comments.length === 0 && <label>No Comments</label>}
                <CommentList comments={this.props.article.comments} user={this.props.user} handleCreateComment={this.handleCreateComment}/>
            </div>
        );
    }
}

export {
    Article
}
