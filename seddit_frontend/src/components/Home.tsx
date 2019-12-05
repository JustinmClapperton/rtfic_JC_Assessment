import React from "react";
import { IUser } from "../models/User";
import { ArticleList } from "./Article/ArticleList";
import { CreateArticle } from "./Article/CreateArticle";
import {IArticle} from "../models/Article";
import { Article } from "./Article/Article";
import "./Home.css"

let mockData = require("../db/data.json")


interface IHomeProps {
    user: IUser
    handleLogout: () => void
}

interface IHomeState {
    isCreatingArticle: boolean
    isViewingArticle: boolean
    articles: IArticle[]
    currentArticle?: IArticle
    currentArticleIdx?: number
}

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        console.log(mockData)
        this.state = { isCreatingArticle: false, isViewingArticle: false, articles: mockData}
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

    private handleArticleUpdated = (article: IArticle, idx: number) => {
        const articles = this.state.articles
        articles[idx] = article
        this.setState({
            articles: articles
        })
    }

    private handleArticleComment = (article: IArticle, idx: number) => {
        console.log(this.state, article, idx)
        if (!this.state.isViewingArticle) {
            this.setState({
                currentArticle: article,
                currentArticleIdx: idx,
                isViewingArticle: true
            })
        } else {
            const articles = this.state.articles
            articles[idx] = article
            this.setState({
                articles: articles
            })
        }
    }

    private goBack = () => {
        this.setState({
            isViewingArticle: false
        })
    }

    render() {
        console.log(this.state.isViewingArticle && this.state.currentArticleIdx && this.state.currentArticle)
        if ( this.state.isCreatingArticle) {
            return (
                <div>
                    <CreateArticle author={this.props.user} handleCreateArticle={this.handleArticleCreated} />
                </div>
            )
        } else if(this.state.isViewingArticle && this.state.currentArticleIdx !== undefined && this.state.currentArticle) {
            return (
                <div>
                    <Article
                        handleCreateComment={this.handleArticleUpdated}
                        handleVote={this.handleArticleUpdated}
                        article={this.state.currentArticle}
                        idx={this.state.currentArticleIdx}
                        user={this.props.user}
                        back={this.goBack}
                    />
                </div>
                )
        } else {
            return (
                <div className={"Home"}>
                    <div>
                        <div className={"LogoutButtonContainer"}><a onClick={this.props.handleLogout} className={"LogoutButton"}>Logout</a></div>

                        <br/>
                        <label>Welcome! {this.props.user.username}</label>

                        <button className={"CreateArticleButton"} onClick={this.showCreateArticle}>Create Article</button>
                        <ArticleList
                            articles={this.state.articles}
                            handleArticleUpdate={this.handleArticleUpdated}
                            handleArticleComment={this.handleArticleComment}
                        />
                    </div>

                </div>
            );
        }
    }
}

export {
    Home
}
