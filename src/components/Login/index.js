import React, {Component, Fragment} from 'react'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input'
import axios from 'axios'
import FlashMessage from '../FlashMessage'

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
        let url = 'https://noodledistress.herokuapp.com/';
        let endPoint = 'user/login/'+this.loginInput.value;

        console.log(url+endPoint);
        axios.get(url+endPoint).then(res => {
            console.log(res.status);
            if (200 === res.status) {
                this.setState({error: null});
                this.props.success(res.data)
            } else throw new Error(this.getError(res))
        }).catch(err => {
            console.log(err);
            this.setState({error: err})
        })
    }

    addUser() {
        let url = 'https://noodledistress.herokuapp.com/';
        let endPoint = 'user/';

        console.log('login', this.newLoginInput, '\nfirst_name', this.newFirstNameInput);
        axios.post(url+endPoint, {login: this.newLoginInput.value, first_name: this.newFirstNameInput.value, excuse: ''}).then(res => {
            if (null !== res.data) {
                this.props.success(res.data)
            }
        })
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
                    <Fragment>
                        <Input type="text" inputRef={(login) => { this.loginInput = login}}/>
                        <Button variant="raised" onClick={this.connect}>Validate</Button>
                        <Button variant="raised" onClick={this.suscribe}>Suscribe</Button>
                    </Fragment>
                </Fragment>
            )
        }
        return(
            <Fragment>
                {this.renderFlashMessage()}
                <Fragment>
                    <input type="text" placeholder="Pseudo" ref={(newLogin) => { console.log(newLogin); this.newLoginInput = newLogin}}/>
                    <input type="text" placeholder="First name" ref={(newFirstName) => { this.newFirstNameInput = newFirstName}}/>
                    <Button variant="raised" onClick={this.addUser}>Validate</Button>
                </Fragment>
            </Fragment>
        )
    }
}

export default Index;
