import React, { Component } from 'react';
import { Login } from './authentication/Login';
import AdminLogin from './authentication/AdminLogin';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {    

    render() {
        return (
            <Router>
                <div>                    
                    <Route exact path='/' component={Login} />
                    <Route path='/eseva/dashboard/:phnum' component={UserDashboard} />
                    <Route path='/admin' component={AdminLogin} />
                    <Route path='/eseva/admindashboard' component={AdminDashboard} />
                </div>
            </Router >
        );
    }

}

export default App;