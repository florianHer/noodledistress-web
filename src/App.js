import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';

// Imports Material-UI
import { MuiThemeProvider } from 'material-ui/styles';
import Theme from './themes/Main/index';

// Import des components
import Login from './components/Login';
import Layout from './components/Layout';
import Account from './components/Account';
import Home from './components/Layout/home';
import { logoutProcess, updateGeolocationProcess } from "./_common/src/processes/Users/index";
import Geolocation from "./_common/src/services/webPositionService";

const locationService = new Geolocation();

class App extends Component {
    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            theme: Theme,
            activeContent: 'home'
        }
    }

    /**
     * Method sent to get content.
     *
     * @param content
     */
    getContent(content) {
        console.log(this.state.activeContent);
        this.setState({ activeContent: content })
    }

    /**
     * User logout
     */
    logout() {
        locationService.stop();
        logoutProcess(this.props.dispatch);
        this.setState({activeContent: 'home'})
    }

    render() {
        console.log('render ok');
        const { activeContent, theme } = this.state;
        const { user } = this.props.user;
        const { getContent, logout, successLogin } = this;
        const { position } = this.props;
        let component = null;

        if (null === user) {
            component = (<Login success={successLogin}/>)
        } else {
            locationService.watch((lat, lng)=>{
                console.log('nouvelle position');
                updateGeolocationProcess(this.props.dispatch, user, {lat, lng})
            });
            switch (activeContent) {
            case 'account':
                component = (<Account user={user} />);
                break;
            case 'home':
                component = (<Home user={user} position={position} />);
                break;
            default:
                break;
        }}

        return (
            <MuiThemeProvider theme={theme}>
                <Layout user={user} getContent={getContent} logout={logout}>
                    {component}
                </Layout>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return { user:state.user, position:state.position }
};

export default connect(mapStateToProps)(App);
