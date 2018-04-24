import React, {Component} from 'react'
import logo from '../../logo-distress.svg'
import Button from 'material-ui/Button'
// import axios from "axios";

class Layout extends Component {

    handleFooterButtons() {
        if(!this.props.user) return null;
        return (<div className={"button-footer"}>
            <Button variant="raised" onClick={() => this.props.getContent('home')}>Home</Button>
            <Button variant="raised" onClick={() => this.props.getContent('account')}>My account</Button>
            <Button onClick={this.props.logout} variant="raised" color="secondary">Logout</Button>
        </div>);
    }

    render() {
        return (
            <div>
                <header>
                    <img src={logo} alt={'logo-react'} width={'100px'}/>
                </header>
                <content>
                    {this.props.children}
                </content>
                <footer>
                    { this.handleFooterButtons() }
                </footer>
            </div>
        )
    }
}

export default Layout;
