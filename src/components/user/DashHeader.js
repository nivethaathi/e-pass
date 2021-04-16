import React from 'react';
import { Link } from 'react-router-dom';

const DashHeader = (props) => {
    let from = props.from;
    let auth = null;
    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '733484748994-48d4ujs19tt4qn51cfgaajtdfatbkn3s.apps.googleusercontent.com',
            scope: 'email'
        }).then(() => {
            auth = window.gapi.auth2.getAuthInstance();
        });
    });
    if (from === 'UserDashboard') {
        return (
            <div className="ui secondary pointing menu">
                <h3>TN ePass Application</h3>
                <div className="right menu">
                    <Link className="ui button" style={{ backgroundColor: '#00b5ad', color: 'white' }}
                        onClick={() => localStorage.clear()}
                        to="/" >Log Out</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ui secondary pointing menu">
                <h3>TN ePass Application</h3>
                <div className="right menu">
                    <Link className="ui button" style={{ backgroundColor: '#00b5ad', color: 'white' }}
                        onClick={() => auth.signOut()}
                        to="/admin" >Log Out</Link>
                </div>
            </div>);
    }
}


export default DashHeader;