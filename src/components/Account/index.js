import React, {Component} from 'react'

class Account extends Component {
    render() {
        const { login, first_name, distance, excuse } = this.props.user;
        return (
            <div>
                <h1>{login}</h1>
                <h2>{first_name}</h2>
                <h2>{distance}</h2>
                <h2>{excuse}</h2>
            </div>
        )
    }
}

export default Account;
