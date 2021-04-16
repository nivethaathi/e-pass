import React, { Component } from 'react';
import DashHeader from './DashHeader';
import { Redirect } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import axios from 'axios';

class UserDashboard extends Component {

    state = {
        phnum: '',
        firstname: '',
        lastname: '',
        address: '',
        age: 0,
        from: '',
        to: '',
        reason: '',
        noofperson: 0,
        modeoftransport: '',
        file: null,
        filename: '',
        modalStatus: false,
        approval_status: 'P',
        rowData: null,
        columnDefs: [
            { headerName: "First Name", field: "firstname" },
            { headerName: "Last Name", field: "lastname" },
            { headerName: "Address", field: "address" },
            { headerName: "Age", field: "age" },
            { headerName: "From", field: "from" },
            { headerName: "To", field: "to" },
            { headerName: "Reason", field: "reason" },
            { headerName: "No. of Person", field: "noofperson" },
            { headerName: "Mode of Transport", field: "modeoftransport" },
            { headerName: "Approval Status", field: "approval_status" }
        ]
    };

    componentDidMount() {
        if (this.props.match.params) {
            let phnum = this.props.match.params.phnum
            this.setState({ phnum: phnum });
            const url = 'http://localhost:5000/api/eseva/user/' + phnum;
            fetch(url)
                .then(res => res.text())
                .then(rowData => this.setState({ rowData: JSON.parse(rowData) }));
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const url = 'http://localhost:5000/api/eseva/user';
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => console.log(res));

        this.setState({ modalStatus: true });

        //fileupload
        const data = new FormData()
        data.append('file', this.state.file)
        axios.post("http://localhost:5000/upload", data, {
            // receive two    parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
            })
    }
    render() {
        let isLoggedIn = localStorage.getItem("loggedIn");
        let dashheaderconfig = 'UserDashboard';
        if (isLoggedIn === 'true') {
            return (
                <div className="ui container">
                    <DashHeader from={dashheaderconfig} />
                    {this.getFormDesign()}
                    <div
                        className="ag-theme-alpine"
                        style={{
                            marginTop: '15px',
                            height: '250px',
                            width: '1130px'
                        }}
                    >
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}>
                        </AgGridReact>
                    </div>
                </div>
            );
        }
        return <Redirect to={`/`} />;

    }

    onChangeHandler = event => {
        let fileData = event.target.files[0];
        let fileName = fileData['name'];
        this.setState({ file: fileData, filename: fileName});
    }

    onCloseModal = () => {
        this.setState({
            phnum: '',
            firstname: '',
            lastname: '',
            address: '',
            age: 0,
            from: '',
            to: '',
            reason: '',
            noofperson: 0,
            modeoftransport: '',
            file: null,
            modalStatus: false,
            rowData: null
        });
        setTimeout(() => {
            if (this.props.match.params) {
                let phnum = this.props.match.params.phnum
                this.setState({ phnum: phnum });
                const url = 'http://localhost:5000/api/eseva/user/' + phnum;
                fetch(url)
                    .then(res => res.text())
                    .then(rowData => this.setState({ rowData: JSON.parse(rowData) }));
            }
        }, 250);
    }

    getFormDesign() {
        return (
            <div>
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <Modal
                        basic
                        onClose={this.actionModalCLose}
                        onOpen={this.onCloseModal}
                        open={this.state.modalStatus}
                        size='small'
                    >
                        <Header icon>
                            <Icon name='check circle outline' />
                                Applied Successfully!
                        </Header>
                        <Modal.Content>
                            {/* <p>
                                Your inbox is getting full, would you like us to enable automatic
                                archiving of old messages?
                            </p> */}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic color='red' inverted onClick={this.onCloseModal}>
                                <Icon name='remove' /> Close
                            </Button>
                            {/* <Button color='green' inverted onClick={() => setOpen(false)}>
                                <Icon name='checkmark' /> Yes
                            </Button> */}
                        </Modal.Actions>
                    </Modal>
                    <h4 className="ui dividing header">ePass Form</h4>
                    <div className="field">
                        <label>Name</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="text" value={this.state.firstname}
                                    onChange={(e) => { this.setState({ firstname: e.target.value }) }}
                                    name="shipping[first-name]" placeholder="First Name" />
                            </div>
                            <div className="field">
                                <input type="text" value={this.state.lastname}
                                    onChange={(e) => { this.setState({ lastname: e.target.value }) }}
                                    name="shipping[last-name]" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <div className="fields">
                            <div className="twelve wide field">
                                <input type="text" value={this.state.address}
                                    onChange={(e) => { this.setState({ address: e.target.value }) }}
                                    name="shipping[address]" placeholder="Residential Address" />
                            </div>
                            <div className="four wide field">
                                <input type="number" value={this.state.age}
                                    onChange={(e) => { this.setState({ age: e.target.value }) }}
                                    name="shipping[Age]" placeholder="Age" />
                            </div>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>From</label>
                            <select className="ui fluid dropdown" value={this.state.from}
                                onChange={(e) => { this.setState({ from: e.target.value }) }}>
                                <option value="">District</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Coimbatore">Coimbatore</option>
                                <option value="Cuddalore">Cuddalore</option>
                                <option value="Dharmapuri">Dharmapuri</option>
                                <option value="Dindigul">Dindigul</option>
                                <option value="Erode">Erode</option>
                                <option value="Kanchipuram">Kanchipuram</option>
                                <option value="Kanyakumari">Kanyakumari</option>
                                <option value="Karur">Karur</option>
                                <option value="Krishnagiri">Krishnagiri</option>
                                <option value="Kallakurichi">Kallakurichi</option>
                                <option value="Madurai">Madurai</option>
                                <option value="Mayiladuthurai">Mayiladuthurai</option>
                                <option value="Nagapattinam">Nagapattinam</option>
                                <option value="Namakkal">Namakkal</option>
                                <option value="Perambalur">Perambalur</option>
                                <option value="Pudukkottai">Pudukkottai</option>
                                <option value="Ramanathapuram">Ramanathapuram</option>
                                <option value="Salem">Salem</option>
                                <option value="Sivagangai">Sivagangai</option>
                                <option value="Thanjavur">Thanjavur</option>
                                <option value="Nilgiris">Nilgiris</option>
                                <option value="Theni">Theni</option>
                                <option value="Thoothukudi">Thoothukudi</option>
                                <option value="Tiruchirapalli">Tiruchirapalli</option>
                                <option value="Tirunelveli">Tirunelveli</option>
                                <option value="Tiruvallur">Tiruvallur</option>
                                <option value="Tiruvannamalai">Tiruvannamalai</option>
                                <option value="Tiruvarur">Tiruvarur</option>
                                <option value="Vellore">Vellore</option>
                                <option value="Viluppuram">Viluppuram</option>
                                <option value="Virudhunagar">Virudhunagar</option>
                                <option value="Ariyalur">Ariyalur</option>
                                <option value="Tirupur">Tirupur</option>

                            </select>
                        </div>
                        <div className="field">
                            <label>To</label>
                            <select className="ui fluid dropdown" value={this.state.to}
                                onChange={(e) => { this.setState({ to: e.target.value }) }}>
                                <option value="">District</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Coimbatore">Coimbatore</option>
                                <option value="Cuddalore">Cuddalore</option>
                                <option value="Dharmapuri">Dharmapuri</option>
                                <option value="Dindigul">Dindigul</option>
                                <option value="Erode">Erode</option>
                                <option value="Kanchipuram">Kanchipuram</option>
                                <option value="Kanyakumari">Kanyakumari</option>
                                <option value="Karur">Karur</option>
                                <option value="Krishnagiri">Krishnagiri</option>
                                <option value="Kallakurichi">Kallakurichi</option>
                                <option value="Madurai">Madurai</option>
                                <option value="Mayiladuthurai">Mayiladuthurai</option>
                                <option value="Nagapattinam">Nagapattinam</option>
                                <option value="Namakkal">Namakkal</option>
                                <option value="Perambalur">Perambalur</option>
                                <option value="Pudukkottai">Pudukkottai</option>
                                <option value="Ramanathapuram">Ramanathapuram</option>
                                <option value="Salem">Salem</option>
                                <option value="Sivagangai">Sivagangai</option>
                                <option value="Thanjavur">Thanjavur</option>
                                <option value="Nilgiris">Nilgiris</option>
                                <option value="Theni">Theni</option>
                                <option value="Thoothukudi">Thoothukudi</option>
                                <option value="Tiruchirapalli">Tiruchirapalli</option>
                                <option value="Tirunelveli">Tirunelveli</option>
                                <option value="Tiruvallur">Tiruvallur</option>
                                <option value="Tiruvannamalai">Tiruvannamalai</option>
                                <option value="Tiruvarur">Tiruvarur</option>
                                <option value="Vellore">Vellore</option>
                                <option value="Viluppuram">Viluppuram</option>
                                <option value="Virudhunagar">Virudhunagar</option>
                                <option value="Ariyalur">Ariyalur</option>
                                <option value="Tirupur">Tirupur</option>
                            </select>
                        </div>
                    </div>
                    <h4 className="ui dividing header">Travel Information</h4>
                    <div className="field">
                        <label>Reason</label>
                        <div className="fields">
                            <div className="twelve wide field">
                                <input type="text" value={this.state.reason}
                                    onChange={(e) => { this.setState({ reason: e.target.value }) }}
                                    name="shipping[Reason]" placeholder="Reason" />
                            </div>
                            <div className="four wide field">
                                <input type="number" value={this.state.noofperson}
                                    onChange={(e) => { this.setState({ noofperson: e.target.value }) }}
                                    name="shipping[No. of Persons]" placeholder="No. of persons" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <select className="ui fluid dropdown" value={this.state.modeoftransport}
                                    onChange={(e) => { this.setState({ modeoftransport: e.target.value }) }}>
                                    <option value="">Mode of Transport</option>
                                    <option value="roadWays">RoadWays</option>
                                    <option value="railways">Railways</option>
                                    <option value="airways">Airways</option>
                                </select>
                            </div>
                            <div className="twelve wide field">
                                <input type="file" name="myImage" onChange={this.onChangeHandler} />
                            </div>
                        </div>
                    </div>
                    <button className="ui button" >Apply</button>
                </form>
            </div>
        );
    }

}

export default UserDashboard;