import React from "react";
import {IArticle} from "../../models/Article";
import { ArticleListItem } from "./ArticleListItem";


interface IArticleListProps {
    articles: IArticle[]
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
                <div>
                    { this.props.articles.map((article, idx) => {return <div key={idx}><ArticleListItem article={article}/><br/></div>})}
                </div>
            );
        }
    }
}

export {
    ArticleList
}
