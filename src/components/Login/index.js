import React, {Component, Fragment} from 'react'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input'
import FlashMessage from '../FlashMessage'
import { connect } from 'react-redux';
import { loginProcess, createUserProcess } from '../../_common/src/processes/Users/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.connect = this.connect.bind(this);
        this.addUser = this.addUser.bind(this);
        this.suscribe = this.suscribe.bind(this);
        this.getError = this.getError.bind(this);
        this.renderFlashMessage = this.renderFlashMessage.bind(this);
        this.loginInput = null;
        this.newLoginInput = null;
        this.newFirstNameInput = null;
        this.state = {
            suscribe: false,
            error: null
        }
    }

    getError(res) {
        let message = '';
        switch (res.status) {
            case 204: message = "Login not found";
                break;
            default: message = "Unexpected error"
        }
        return message
    }

    connect() {
        console.log(this.loginInput);
        loginProcess(this.props.dispatch, this.loginInput.value)
    }

    addUser() {
        createUserProcess(this.props.dispatch, {login: this.newLoginInput.value, first_name: this.newFirstNameInput.value, excuse: ''})
    }

    suscribe() {
        this.setState({suscribe: true})
    }

    renderFlashMessage() {
        if (null === this.state.error) {
            return null;
        }
        return (<FlashMessage text={this.state.error.message} />);
    }

    render() {
        // if !suscribe then render connect action or suscribe else render suscribe action
        if (false === this.state.suscribe) {
            return(
                <Fragment>
                    {this.renderFlashMessage()}
                    <Input type="text" inputRef={(login) => { this.loginInput = login}}/>
                    <Button variant="raised" onClick={this.connect}>Validate</Button>
                    <Button variant="raised" onClick={this.suscribe}>Suscribe</Button>
                </Fragment>
            )
        }
        return(
            <Fragment>
                {this.renderFlashMessage()}
                <input type="text" placeholder="Pseudo" ref={(newLogin) => {this.newLoginInput = newLogin}}/>
                <input type="text" placeholder="First name" ref={(newFirstName) => { this.newFirstNameInput = newFirstName}}/>
                <Button variant="raised" onClick={this.addUser}>Validate</Button>
            </Fragment>
        )
    }
}

export default connect()(Index);
