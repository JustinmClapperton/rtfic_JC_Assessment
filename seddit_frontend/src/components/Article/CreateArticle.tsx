import {IUser} from "../../models/User";
import React from "react";
import {IArticle} from "../../models/Article";
import "./CreateArticle.css"

interface ICreateArticleProps {
    author: IUser
    handleCreateArticle: (article: IArticle) => void
}

interface ICreateArticleState {
    title: string
    content: string
}

class CreateArticle extends React.Component<ICreateArticleProps, ICreateArticleState> {
    constructor(props: ICreateArticleProps) {
        super(props);
        this.state = { title: "", content: "" }
    }

    private handleInputChange = (event: any) => {
        event.preventDefault();
        //@ts-ignore
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    private  handlePost = () => {
        const article = {title: this.state.title, content: this.state.content, author: this.props.author, votes: [], comments: []}
        this.props.handleCreateArticle(article)
    }

    render() {
        return (
            <div className={"CreateArticle"}>
                <label>
                    Title
                    <br/>
                    <input className={"CreateArticleTitle"} type={"text"} value={this.state.title} name={"title"} onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Content
                    <br/>
                    <textarea value={this.state.content} name={"content"} onChange={this.handleInputChange}/>
                </label>
                <br/>
                <button onClick={this.handlePost}>Post</button>
            </div>
        );
    }
}
export {
    CreateArticle,
}
