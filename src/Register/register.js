import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { GET_POST_HEADER } from '../constants/constants.js';
import { process_submit } from '../constants/constants';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state={  selectedOption: 'general',
                  token: null,
                  username: null,
                  password: null,
                  fname: null,
                  lname: null,
                  role: null,
                  email: null,
                  phone: null,
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
    console.log(this.state)
  }

  handleRegSubmit(e){
    e.preventDefault();
    let body = process_submit(e.target.elements);
    if (e.target.elements.account_type[0].checked){
      body.account_type='general';
    } else if  (e.target.elements.account_type[1].checked) {
      body.account_type='admin';
    }

    const header = GET_POST_HEADER;
    header.body=JSON.stringify(body);
    fetch('http://localhost:3100/api/register', header )
      .then(response => response.json())
      .then(user => {
        let userInfo = JSON.parse(user._bodyText)
        if (!userInfo.message){
          // AsyncStorage.setItem('login_token', userInfo.token)
          // .then( token => {
          //   this.setState({ loginModalVisible: visible });
          //   this.props.loginCB({ username: this.state.username });
          // })
        } else {
          this.setState({message: userInfo.message })
        }
      })
      .catch( err => {
        console.log('THERE WAS AN ERROR');
      })
  }


  render() {
    return (<div className="body">
        <div className="main">
          <p>
            StageRabbit is free to use for the general public. No account is required to search our extensive database of regional, community, and school theater productions.
          </p>
          <p>
            We do offer two types of accounts:
          </p>
          <h2>Theater Administrator</h2>
          <p>
            If are associated with a listed theater, you can request an account to become and Administrator of your
            &rsquo;s content.
            <ol>
              <li>
                  Request a token to authorize your account by sending an email
                  to <a href='mailto:stagerabbit@gmail.com'>stagerabbit@gmail.com</a> with <strong>your name</strong> and <strong>your theater name and location</strong>.
              </li>
              <li>
                  When you have your token, return to this page, and complete the registration form, including the token.
              </li>
              <li>
                  Once you have registered, you will have access to update all information related to your
                  theater and your theater&rsquo;s productions. (Note: All updates are subject to approval.)
              </li>
            </ol>
          </p>
          <h2>General</h2>
          <p>
            You can create a general account to keep up-to-date with StageRabbit.
            We may send you periodic emails on enhancements and new features.
            We also have exciting future plans to offer free email reminders of
            productions and locations you are interested in.
          </p>
          <h2>Register</h2>
          <form className='registration-form' onSubmit={this.handleRegSubmit}>

          <span className="runin">Account Type:</span>
            <span className="runin">General</span>

            <input  type="radio"
                    id="acct-gen"
                    name='account_type'
                    checked={ this.state.selectedOption === 'general' }
                    value='general'
                    onChange={this.handleOptionChange} />

            <span className="runin">Admin</span>
            <input  type="radio"
                    id="acct-admin"
                    name="account_type"
                    value='admin'
                    checked= { this.state.selectedOption === 'admin' }
                    onChange={this.handleOptionChange} />

              <div><span className="runin">Token:</span>
                <input  id="token"
                        key="token"
                        type="text"
                        name="token"
                        value={this.state.token}
                        onChange={this.handleChange} />
                  <span className='note'>(Required only for Theater Admin accounts.)</span>
              </div>

              <div><span className="runin">Username:</span>
                <input  id="username"
                        key="username"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange} />
              </div>

              <div><span className="runin">Password:</span>
                <input  id="password"
                        key="password"
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} />
              </div>

              <div><span className="runin">First Name:</span>
                <input  id="fname"
                        key="fname"
                        type="text"
                        name="fname"
                        value={this.state.fname}
                        onChange={this.handleChange} />
              </div>

              <div><span className="runin">Last Name:</span>
                <input  id="lname"
                        key="lname"
                        type="text"
                        name="lname"
                        value={this.state.lname}
                        onChange={this.handleChange} />
              </div>

              <div><span className="runin">Title/Role:</span>
                <input  id="role"
                        key="role"
                        type="text"
                        name="role"
                        value={this.state.role}
                        onChange={this.handleChange} />
              </div>

              <div><span className="runin">Email Address:</span>
                <input  id="email"
                        key="email"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
              </div>

              <div><span className="runin">Phone Number:</span>
                <input  id="phone"
                        key="phone"
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange} />
              </div>

              <input className='subbutt' id='submit-reg' type="submit" value='Submit' />

          </form>

        </div>
      </div>
    );
  }
}

export default Register;