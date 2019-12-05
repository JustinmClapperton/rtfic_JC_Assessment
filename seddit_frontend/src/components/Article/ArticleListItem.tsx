import React from "react";
import {IArticle} from "../../models/Article";
import {VoteType} from "../../models/Vote";
import './ArticleListItem.css'

interface IArticleListItemProps {
    handleVote: (article: IArticle, idx: number) => void
    handleCreateComment: (article: IArticle, idx: number) => void
    article: IArticle
    idx: number
}

interface IArticleListItemState {

}

class ArticleListItem extends React.Component<IArticleListItemProps, IArticleListItemState> {

    private handleVote = (event: any) => {
        let article = this.props.article
        if (event.target.name === "upVote") {
            article.votes.push({voteType: VoteType.up, author: this.props.article.author})
        } else {
            article.votes.push({voteType: VoteType.down, author: this.props.article.author})
        }
        this.props.handleVote(article, this.props.idx)
    }

    private handleComment = () => {
        this.props.handleCreateComment(this.props.article, this.props.idx)
    }

    render() {
        return (
            <div className={"ArticleListItem"}>
                <label className={"ArticleListItemAuthor"}>posted by: {this.props.article.author.username}</label>
                <br/>
                <label className={"ArticleListItemTitle"}>
                    <a onClick={this.handleComment}>{this.props.article.title}</a>
                </label>
                <br/>
                <div className={"ArticleListItemContent"}>{this.props.article.content}</div>
                <br/>
                Up Votes: {`${this.props.article.votes.filter( vote => vote.voteType === VoteType.up).length} `}
                Down Votes: {`${this.props.article.votes.filter( vote => vote.voteType === VoteType.down).length} `}
                Comments: {this.props.article.comments.length}
                <br/>
                <div className={"ArticleListItemButtonContainer"}>
                    <button name={"upVote"} className={"ArticleListItemButton"} onClick={this.handleVote}>Up Vote</button>
                    <button name={"downVote"} className={"ArticleListItemButton"} onClick={this.handleVote}>Down Vote</button>
                    <button name={"createComment"} className={"ArticleListItemButton"} onClick={this.handleComment}>Comment</button>
                </div>

            </div>
        );
    }
}

export {
    ArticleListItem
}
