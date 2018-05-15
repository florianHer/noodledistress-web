import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { sendCallAction } from "../../_common/src/processes/Calls";

import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.sendCall = this.sendCall.bind(this);
        this.answerCall = this.answerCall.bind(this);
    }

    sendCall() {
        sendCallAction(this.props.dispatch, this.props.user)
        // Modifier le bouton d'appel
    }

    answerCall() {

    }

    render() {
        return (
            <div>
                <Button variant="raised" color="primary" onClick={this.sendCall}>
                    Besoins d'aide !
                    <Icon>call</Icon>
                </Button>
            </div>
        )
    }
}

export default connect()(Home);
