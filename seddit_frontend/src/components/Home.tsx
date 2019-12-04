import React from "react";
import {IUser} from "../models/User";


interface IHomeProps {
    user: IUser
}

interface IHomeState {

}

class Home extends React.Component<IHomeProps, IHomeState> {

    render() {
        return (
            <div>
                {this.props.user.username}
            </div>
        );
    }

}

export {
    Home
}
