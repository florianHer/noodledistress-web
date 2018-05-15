import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { updateUserProcess } from '../../_common/src/processes/Users/index';
import { connect } from 'react-redux';

class Account extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.firstNameInput = null;
        this.distanceInput = null;
        this.excuseInput = null;
    }

    updateUser() {
        updateUserProcess(this.props.dispatch, {
            ...this.props.user,
            first_name: this.firstNameInput.value,
            distance: this.distanceInput.value,
            excuse: this.excuseInput.value
        })
    }

    render() {
        const { login, first_name, distance, excuse } = this.props.user;
        const labelProps = {shrink:true};
        return (
            <div>
                <h1>{login}</h1>
                <TextField InputLabelProps={labelProps} label="First name" placeholder={ first_name } margin="normal"
                           inputRef={(newFirstName) => {this.firstNameInput = newFirstName}}/>
                <TextField InputLabelProps={labelProps} label="Distance" placeholder={ distance+'' } margin="normal"
                           inputRef={(newDistance) => {this.distanceInput = newDistance}}/>
                <TextField InputLabelProps={labelProps} label="Excuse" placeholder={ excuse } margin="normal"
                           inputRef={(newExcuse) => {this.excuseInput = newExcuse}}/>
                <Button variant="raised" onClick={this.updateUser}>Validate</Button>
            </div>
        )
    }
}

export default connect()(Account);
