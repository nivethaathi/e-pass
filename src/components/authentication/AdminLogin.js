import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class AdminLogin extends Component {

    state = { isSignedIn: null };

    componentDidMount() {
        localStorage.setItem("adminLoggedin", false);
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '733484748994-48d4ujs19tt4qn51cfgaajtdfatbkn3s.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {            
            localStorage.setItem("adminLoggedin", true);
            return <Redirect to='/eseva/admindashboard' />;
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                Sign In
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }

}
export default AdminLogin;