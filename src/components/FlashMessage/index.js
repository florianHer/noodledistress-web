import React, {Component} from 'react'
import Snackbar from 'material-ui/Snackbar';

class FlashMessage extends Component {

    render() {
        if (!this.props.text) return null;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={true}
                autoHideDuration={4000}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.text}</span>}
            />
        )
    }
}

export default FlashMessage;
