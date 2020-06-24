import React from 'react';
import { withRouter } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';
import { PageDoesNotExist } from './pages/PageDoesNotExist';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ContactCreation from "./components/Contacts/ContactManagement/ContactCreation/ContactCreation";
import ContactManagement from "./components/Contacts/ContactManagement/ContactManagement";
import ContactsGrid from "./components/Contacts/ContactsGrid/ContactsGrid";
import ContactsFinder from "./components/Contacts/ContactsFinder/ContactsFinder";
import axios from 'axios';

const RootApp = () => {
    return (
            <MuiThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <AppWithRouter />
                </BrowserRouter>
            </MuiThemeProvider>
    )
};

export default RootApp;

class App extends React.Component {

    render() {
        return (
            <div style={{minHeight: '100vh', boxSizing: 'border-box'}} id='app-container'>
                <Header />
                <Switch>
                    <Route path='/api/contacts/finder' component={ContactsFinder}/>
                    <Route path='/api/contacts/list-view' component={ContactCreation}/>
                    <Route path='/api/contacts/grid-view' component={ContactsGrid}/>
                    <Route path='/api/create-contact' component={ContactCreation}/>
                    <Route path='/api/contacts/manage' component={ContactManagement}/>
                    <Route exact path='/api/contacts' component={Home}/>
                    <Route path='*' component={PageDoesNotExist}/>
                </Switch>
                <Footer />
            </div>
        );
    }
}

const AppWithRouter = withRouter(App);
