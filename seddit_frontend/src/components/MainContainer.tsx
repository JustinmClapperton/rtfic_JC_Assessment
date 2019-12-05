import React from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import { IUser } from "../models/User";
import "./MainContainer.css"
import moment from "moment";

interface IMainContainerProps {

}

interface IMainContainerState {
    isLoggedIn: boolean,
    user?: IUser
}

class MainContainer extends React.Component<IMainContainerProps, IMainContainerState> {

    constructor(props: IMainContainerProps) {
        super(props);
        if (document.cookie) {
            let username = document.cookie.split("=")[1]
            if (username === "") {
                this.state = { isLoggedIn: false }
            } else {
                this.state = {
                    isLoggedIn: true,
                    user: {
                        username: username
                    }
                }
            }

        } else {
            this.state = { isLoggedIn: false }
        }
    }

    private handleLogin = (username: string) => {
        this.setState({
            isLoggedIn: true,
            user: { username: username }
        })
    }

    private handleLogout = () => {
        document.cookie = "username=; expires="+moment().subtract(1, "days").toISOString()+"; path=/";
        this.setState({
            isLoggedIn: false,
            user: undefined
        })
    }

    render() {
        if (this.state.isLoggedIn && this.state.user) {
            return (
                <div>
                    <Home handleLogout={this.handleLogout} user={this.state.user}/>
                </div>
            );
        } else {
            return (
                <div className={"MainContainer"}>
                    <Login handleLogin={this.handleLogin}/>
                </div>
            );
        }

    }
}

export {
    MainContainer
}
