import {IUser} from "../../models/User";
import React from "react";
import {IArticle} from "../../models/Article";

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
        const article = {title: this.state.title, content: this.state.content, author: this.props.author}
        this.props.handleCreateArticle(article)
    }

    render() {
        return (
            <div>
                <label>
                    Title:
                    <input value={this.state.title} name={"title"} onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Content:
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
