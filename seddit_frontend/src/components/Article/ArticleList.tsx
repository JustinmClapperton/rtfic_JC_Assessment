import React from "react";
import {IArticle} from "../../models/Article";
import { ArticleListItem } from "./ArticleListItem";
import "./ArticleList.css"


interface IArticleListProps {
    articles: IArticle[]
    handleArticleUpdate: (article: IArticle, idx: number) => void
    handleArticleComment: (article: IArticle, idx: number) => void
}

interface IArticleListState {
    currentArticle: IArticle
    selectedArticleIndex: number
}

class ArticleList extends React.Component<IArticleListProps, IArticleListState> {

    render() {
        if (this.props.articles.length === 0) {
            return (
                <div>
                    <label>No Articles to view</label>
                </div>
                )
        } else {
            return (
                <div className={"ArticleList"}>
                    { this.props.articles.map((article, idx) => {
                        return (
                            <div key={idx}>
                                <ArticleListItem
                                    article={article}
                                    idx={idx}
                                    handleVote={this.props.handleArticleUpdate}
                                    handleCreateComment={this.props.handleArticleComment}/>
                                <br/>
                            </div>
                        )
                    })}
                </div>
            );
        }
    }
}

export {
    ArticleList
}
