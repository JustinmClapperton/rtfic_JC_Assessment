import React from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import { IUser } from "../models/User";

interface IMainContainerProps {

}

interface IMainContainerState {
    isLoggedIn: boolean,
    user?: IUser
}

class MainContainer extends React.Component<IMainContainerProps, IMainContainerState> {

    constructor(props: IMainContainerProps) {
        super(props);
        this.state = { isLoggedIn: false }

    }

    private handleLogin = (username: string) => {
        this.setState({
            isLoggedIn: true,
            user: { username: username }
        })
    }

    render() {
        if (this.state.isLoggedIn && this.state.user) {
            return (
                <div>
                    <Home user={this.state.user}/>
                </div>
            );
        } else {
            return (
                <div>
                    <Login handleLogin={this.handleLogin}/>
                </div>
            );
        }

    }
}

export {
    MainContainer
}
