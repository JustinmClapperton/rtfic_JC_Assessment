import React from "react";
import "./Login.css"

interface ILoginProps {
    handleLogin: (username: string) => void
}

interface ILoginState {
    username: string
}

class Login extends React.Component<ILoginProps, ILoginState>{

    constructor(props: ILoginProps) {
        super(props);
        this.state = { username: "" }
    }

    private handleUsernameChange = (event: any) => {
        event.preventDefault();
        if (event.target.name === "username") {
            this.setState({
                username: event.target.value
            })
        }
    }

    private handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.handleLogin(this.state.username)
    }


    render() {
        return (
            <div className={"Login"}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username
                        <br/>
                        <input className={"LoginUsername"} type={"text"} name={"username"} value={this.state.username} onChange={this.handleUsernameChange} />
                    </label>
                    <br/>
                    <input className={"LoginButton"} type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export {
    Login
}
