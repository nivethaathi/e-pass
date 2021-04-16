import React, { Component } from 'react';
import DashHeader from './DashHeader';
import UserDetailView from './UserDetailView';
import { Redirect } from 'react-router-dom';

class AdminDashboard extends Component {

    state = {
        rowData: null,
        loadedData: null,
        selectedData: {},
        allData: null,
        modeoftransport: ''
    };

    componentDidMount() {
        const url = 'http://localhost:5000/api/eseva/user';
        fetch(url)
            .then(res => res.text())
            .then(rowData => {
                this.setState({ allData: rowData });
                this.formUserCard(rowData);
            });
    }

    sortByTransportMode = (e) => {
        console.log('sortByTransportMode==->', e);
        this.setState({ modeoftransport: e });
        setTimeout(() => {
            this.formUserCard(this.state.allData);
        }, 250);
    }

    onApprove = (e) => {
        const url = 'http://localhost:5000/api/eseva/user/' + e.id;
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: e.id, approval_status: 'A' })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ selectedData: {} });
                const url = 'http://localhost:5000/api/eseva/user';
                fetch(url)
                    .then(res => res.text())
                    .then(rowData => {
                        this.setState({ allData: rowData });
                        this.formUserCard(rowData);
                    });
            });


    }

    onDecline = (e) => {
        const url = 'http://localhost:5000/api/eseva/user/' + e.id;
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: e.id, approval_status: 'D' })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ selectedData: {} });
                const url = 'http://localhost:5000/api/eseva/user';
                fetch(url)
                    .then(res => res.text())
                    .then(rowData => {
                        this.setState({ allData: rowData });
                        this.formUserCard(rowData);
                    });
            });
    }

    formUserCard(usersData) {
        let data = JSON.parse(usersData);
        let userList = data.map(
            (e) => {
                console.log(this.state.modeoftransport, ' === ', e.modeoftransport);
                if (this.state.modeoftransport === e.modeoftransport) {
                    return (
                        <div className="ui cards" onClick={() => this.setState({ selectedData: e })}>
                            <div className="card">
                                <div className="content">
                                    <img alt={e.id} className="right floated mini ui image" src="/static/images/user.png" />
                                    <div className="header">
                                        {e.firstname + ' ' + e.lastname}
                                    </div>
                                    {/* <div className="meta">                                
                                </div> */}
                                    <div className="description">
                                        {e.from} to {e.to}
                                    </div>
                                </div>
                                <div className="extra content">
                                    <div className="ui two buttons">
                                        <div className="ui basic green button" onClick={() => this.onApprove(e)}>Approve</div>
                                        <div className="ui basic red button" onClick={() => this.onDecline(e)}>Decline</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                return <div></div>;
            }
        );
        this.setState({ rowData: data, loadedData: userList });
    }

    render() {
        let loggedin = localStorage.getItem("adminLoggedin");
        let imgUrl = '';
        if (this.state.selectedData.filename) {
            let selectedimg = this.state.selectedData.filename;
            imgUrl = 'http://localhost:5000/getimage/' + selectedimg;
        }
        if (loggedin === 'true') {
            if (this.state.rowData) {
                return (<div>
                    <DashHeader />
                    <div className='ui container' style={{ marginTop: '10px' }}>
                        <div className="ui grid">
                            <div className="ui row">
                                <div className="eleven wide column">
                                    <div>
                                        <select className="ui fluid dropdown" value={this.state.from}
                                            onChange={(e) => { this.sortByTransportMode(e.target.value) }}>
                                            <option value="">Select</option>
                                            <option value="roadWays">RoadWays</option>
                                            <option value="railways">Railways</option>
                                            <option value="airways">Airways</option>
                                        </select>
                                        <UserDetailView selectedData={this.state.selectedData} />
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <img src={imgUrl} alt="aadhar" style={{ width: '800px', height: '1000px' }} />
                                    </div>
                                </div>
                                <div className="five wide column">
                                    {this.state.loadedData}
                                </div>
                            </div>
                        </div>
                    </div >

                </div>);
            }
            return <div>Loading....</div>;
        }
        return <Redirect to={`/admin`} />;
    }

}

export default AdminDashboard;