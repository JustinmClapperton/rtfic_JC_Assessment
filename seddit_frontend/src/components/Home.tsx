import React from "react";
import { IUser } from "../models/User";
import { ArticleList } from "./Article/ArticleList";
import { CreateArticle } from "./Article/CreateArticle";
import {IArticle} from "../models/Article";


interface IHomeProps {
    user: IUser
}

interface IHomeState {
    isCreatingArticle: boolean
    articles: IArticle[]
}

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        this.state = { isCreatingArticle: false, articles: []}
    }


    private showCreateArticle = () => {
        this.setState({
            isCreatingArticle: true
        })
    }

    private handleArticleCreated = (article: IArticle) => {
        const articles = this.state.articles
        articles.push(article)
        this.setState({
            isCreatingArticle: false,
            articles: articles
        })
    }

    render() {
        if ( this.state.isCreatingArticle) {
            return (
                <div>
                    <CreateArticle author={this.props.user} handleCreateArticle={this.handleArticleCreated} />
                </div>
            )
        }
        return (
            <div>
                {this.props.user.username}
                <button onClick={this.showCreateArticle}>Create Article</button>
                <ArticleList articles={this.state.articles}/>
            </div>
        );
    }

}

export {
    Home
}
