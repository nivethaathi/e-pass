import React, { Component } from 'react';

class UserDetailView extends Component {

    state = { coviddata: {} };

    componentDidMount() {
        const url = 'https://api.covid19india.org/state_district_wise.json';
        fetch(url)
            .then(res => res.text())
            .then(coviddata => {
                let data = JSON.parse(coviddata);
                let districtData = data['Tamil Nadu'].districtData;
                this.setState({ coviddata: districtData });
            });
    }

    render() {
        this.selectedData = this.props.selectedData;
        let fromDistrict = this.selectedData.from;
        let toDistrict = this.selectedData.to;
        let districtData = this.state.coviddata;
        let fromDistrictData = districtData[fromDistrict];
        let toDistrictData = districtData[toDistrict];
        let fromActive = 0;
        let fromConfirmed = 0;
        let fromDeceased = 0;
        let fromRecovered = 0;
        let toActive = 0;
        let toConfirmed = 0;
        let toDeceased = 0;
        let toRecovered = 0;
        if (fromDistrictData) {
            fromActive = fromDistrictData.active;
            fromConfirmed = fromDistrictData.confirmed;
            fromDeceased = fromDistrictData.deceased;
            fromRecovered = fromDistrictData.recovered;
        }
        if (toDistrictData) {
            toActive = toDistrictData.active;
            toConfirmed = toDistrictData.confirmed;
            toDeceased = toDistrictData.deceased;
            toRecovered = toDistrictData.recovered;
        }
        return (
            <div>
                First Name       : {this.selectedData.firstname} <br />
            Last Name        : {this.selectedData.lastname} <br />
            Age              : {this.selectedData.age} <br />
            Address          : {this.selectedData.address} <br />
            Ph no.           : {this.selectedData.phnum} <br />
            From             : {this.selectedData.from} <br />
                <div style={{ backgroundColor: "yellow" }}>
                    Active: {fromActive} Confirmed: {fromConfirmed} Deceased: {fromDeceased} Recovered: {fromRecovered}
                </div><br />
            To               : {this.selectedData.to} <br />
                <div style={{ backgroundColor: "yellow" }}>
                    Active: {toActive} Confirmed: {toConfirmed} Deceased: {toDeceased} Recovered: {toRecovered}
                </div><br />
            No. of Person    : {this.selectedData.noofperson} <br />
            Mode of Transport: {this.selectedData.modeoftransport} <br />
            Reason           : {this.selectedData.reason}
            </div>
        );
    }
}

export default UserDetailView;