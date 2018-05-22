import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class SimpleAppBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }
    toggleDrawer = (open) => () => {
        this.setState({
            menuOpen: open,
        });
    };
    changeContent = (route) => () => {
        this.setState({
            menuOpen: false,
        });
        this.props.getContent(route);
    };
    render () {
        return (
            <div className={'root'}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        {
                            this.props.user === null ? null : (
                                <Button onClick={this.toggleDrawer(true)}><Icon>menu</Icon></Button>)
                        }
                        <Typography variant="title" color="inherit">
                            Noodle Distress
                        </Typography>
                    </Toolbar>
                </AppBar>
                {
                    this.props.user === null ? null : (
                        <SwipeableDrawer
                            open={this.state.menuOpen}
                            onClose={this.toggleDrawer(false)}
                            onOpen={this.toggleDrawer(true)} className={'burger-menu'}>
                            <List component="nav">
                                <ListItem button onClick={this.changeContent('home')}>
                                    <ListItemIcon>
                                        <Icon>home</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <ListItem button onClick={this.changeContent('account')}>
                                    <ListItemIcon>
                                        <Icon>account_box</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="My account" />
                                </ListItem>
                            </List>
                            <Divider />
                            <List component="nav">
                                <ListItem button onClick={() => {
                                    this.setState({menuOpen: false,});
                                    this.props.logout()
                                }} className={'red-action'}>
                                    <ListItemIcon>
                                        <Icon>exit_to_app</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </SwipeableDrawer>)
                }
            </div>
        );
    }
}

export default SimpleAppBar;