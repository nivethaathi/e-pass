import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import Countdown from 'react-countdown';
import firebase from './firebase';

export class Login extends Component {

  state = {
    phoneNo: '+91',
    OTP: '',
    buttonTyp: '',
    callbackFunc: null,
  };

  onSubmit = (e) => {
    e.preventDefault();

    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = this.state.phoneNo;
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e) => {

      console.log('e--->', e);

      var submitCallback = () => {
        var code = this.state.OTP;
        if (code === null) return;
        e.confirm(code).then((result) => {
          localStorage.setItem("loggedIn", true);
          this.setState({ buttonTyp: 'dashboard' });
        }).catch((error) => {
          console.error(error);
        });
      }
      this.setState({ callbackFunc: submitCallback, buttonTyp: 'Enter OTP' });

    }).catch(function (error) {
      console.error(error);
    });

  }

  onOtpSubmit = (submitCallback) => {
    console.log('inside onOtpSubmit=-=-');
    this.state.callbackFunc();
  }

  componentDidMount() {
    localStorage.setItem("loggedIn", false);
    this.setState({ buttonTyp: 'Send OTP' });
  }

  onCountdownComplete = () => {
    this.setState({ buttonTyp: 'Send OTP' });
  }

  renderer = ({ minutes, seconds }) => {
    return <span>{minutes}:{seconds}</span>;
  };

  render() {
    if (this.state.buttonTyp === 'Send OTP') {
      return <div>{this.sendOTP()}</div>;
    } else if (this.state.buttonTyp === 'Enter OTP') {
      return <div>{this.verifyOTP()}</div>;
    } else if (this.state.buttonTyp === 'dashboard') {
      return <Redirect to={`/eseva/dashboard/${this.state.phoneNo}`} />;
    }
    return <div></div>;
  }

  sendOTP() {
    return (
      <div className="App">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <img src="/static/images/TNlogo.png" alt="logo" className="image" />{" "}
              <br />TN ePass <br />
              Tamil Nadu COVID-19 ePass
            </Header>
            <Form size="large" >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Phone No."
                  value={this.state.phoneNo}
                  onChange={(e) => { this.setState({ phoneNo: e.target.value }) }}
                />
                <div id="recaptcha"></div>
                <Button color="teal" fluid size="large"
                  onClick={this.onSubmit}>
                  Send OTP
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  verifyOTP() {
    return (
      <div className="App">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <img src="/static/images/TNlogo.png" alt="logo" className="image" />{" "}
              <br />TN ePass <br />
              Tamil Nadu COVID-19 ePass
            </Header>
            <Form size="large" >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Phone No."
                  value={this.state.phoneNo}
                  onChange={(e) => { this.setState({ phoneNo: e.target.value }) }}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter OTP"
                  onChange={(e) => { this.setState({ OTP: e.target.value }) }}
                />
                <Countdown
                  date={Date.now() + 60000}
                  renderer={this.renderer}
                  onComplete={this.onCountdownComplete}
                />
                <Button color="teal" fluid size="large"
                  onClick={this.onOtpSubmit}>
                  Verify OTP
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}