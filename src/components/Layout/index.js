import React, {Component} from 'react'
import SimpleAppBar from './simpleappbar'

class Layout extends Component {

    handleFooterButtons() {
    }

    render() {
        return (
            <div>
                <header>
                    <SimpleAppBar user={this.props.user} getContent={this.props.getContent} logout={this.props.logout}/>
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
