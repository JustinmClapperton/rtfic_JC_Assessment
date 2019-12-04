import React from "react";

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
        if (event.target.name === "username") {
            this.setState({
                username: event.target.value
            })
        }
    }

    private handleSubmit = () => {
        this.props.handleLogin(this.state.username)
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type={"text"} name={"username"} value={this.state.username} onChange={this.handleUsernameChange} />
                    </label>
                    <input type="submit" value="Login" />
                </form>

            </div>
        );
    }

}

export {
    Login
}
