import React from "react";
import {IArticle} from "../../models/Article";
import './ArticleListItem.css'

interface IArticleListItemProps {
    article: IArticle
}

interface IArticleListItemState {

}

class ArticleListItem extends React.Component<IArticleListItemProps, IArticleListItemState> {

    render() {
        return (
            <div className={"ArticleListItem"}>
                <label className={"ArticleListItemTitle"}>
                    {this.props.article.title}:
                </label>
                <br/>
                <div className={"ArticleListItemContent"}>{this.props.article.content}</div>
                <br/>
                <label className={"ArticleListItemAuthor"}>posted by: {this.props.article.author.username}</label>
            </div>
        );
    }
}

export {
    ArticleListItem
}
