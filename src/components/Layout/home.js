import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import { sendCallAction } from "../../_common/src/processes/Calls";

import { connect } from 'react-redux';
import {getAlertsAction} from "../../_common/src/processes/Alerts";

class Home extends Component {
    constructor(props) {
        super(props);
        this.sendCall = this.sendCall.bind(this);
        this.answerCall = this.answerCall.bind(this);
        this.getAlerts = this.getAlerts.bind(this);
    }

    sendCall() {
        sendCallAction(this.props.dispatch, this.props.user)
        // Modifier le bouton d'appel
    }

    answerCall() {

    }

    getAlerts() {
        getAlertsAction(this.props.dispatch, this.props.user);
    }

    componentDidMount() {
        this.getAlerts();
    }

    render() {
        const { alerts } = this.props.alerts;
        return (
            <div>
                <Button variant="raised" color="primary" onClick={this.sendCall}>
                    Besoins d'aide !
                    <Icon>call</Icon>
                </Button><br />
                <span>latitude : {this.props.position.lat}</span><br />
                <span>longitude : {this.props.position.lng}</span>
                {
                    alerts === null?null:
                    alerts.map((alert, i) => {
                        console.log(alert);
                    return (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Icon>record_voice_over</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={alert.creator.first_name+' : '+alert.creator.excuse}/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Add" onClick={this.answerCall}>
                                    <Icon>call_made</Icon>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { alerts:state.alerts }
};

export default connect(mapStateToProps)(Home);
