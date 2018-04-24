import React, {Component} from 'react';
import './App.css';

// Imports Material-UI
import { MuiThemeProvider } from 'material-ui/styles';
import Theme from './themes/Main/index'

// Import des components
import Login from './components/Login'
import Layout from './components/Layout'
import Account from './components/Account'

class App extends Component {
    constructor(props) {
        super(props);
        this.successLogin = this.successLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.getContent = this.getContent.bind(this);
        this.state = {
            user: {
                "id": 2,
                "login": "florianh",
                "first_name": "florian",
                "excuse": "Trop de bla bla",
                "longitude": 0,
                "latitude": 0,
                "distance": 200
            },
            theme: Theme,
            activeContent: null
        }
    }

    successLogin(user) {
        this.setState({user: user})
    }

    logout() {
        this.setState({user: null})
    }

    getContent(content) {
        console.log(this.state.activeContent);
        this.setState({activeContent: content})
    }

    render() {
        console.log('render ok');
        const { user, activeContent, theme } = this.state;
        const { getContent, logout, successLogin } = this;
        let component = null;

        if (null === user) {
            component = (<Login success={successLogin}/>)
        } else switch (activeContent) {
            case 'account':
                component = (<Account user={user} />);
                break;
            default:
                break;
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Layout user={user} getContent={getContent} logout={logout}>
                    {component}
                </Layout>
            </MuiThemeProvider>
        )
    }

}

export default App;
