import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { GET_POST_HEADER, URL, process_submit } from '../constants/constants.js';


import  { login } from '../Register/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={ email: null, message: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleReminder = this.handleReminder.bind(this);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleReminder(e) {
    e.preventDefault();
    let body = process_submit(e.target.elements);
    GET_POST_HEADER.body = JSON.stringify(body);
    fetch(`${URL}auth/reminder`, GET_POST_HEADER)
    .then(response => response.json())
    .then(data => this.setState({ message: data.message }) )
    .catch( err => console.log(err.message));
  }

  render() {
    return (
              <div className='loginPage'>

                <h2>Password Reminder</h2>

                {(this.state.message)
                    ? <div class="error">{ this.state.message }</div>
                    : null
                }

                <p>Submit your registration email to recieve an email reminder
                     at that email address.</p>

                <form onSubmit={this.handleReminder}>
                  <div className="fill">
                    {/*<span className="runin">Email:</span>*/}
                    <input
                        type='text'
                        className='login'
                        id='username'
                        key='username'
                        name='username'
                        value={this.state.email}
                        placeholder="Type your registration email here &ensp;.&ensp;.&ensp;."
                        onChange={this.handleChange}/>
                  </div>

                  <input  className='subbutt'
                          id='password'
                          type="submit"
                          value='Send Reminder' />
                </form>
                <div className="links">
                  <Link className="link" to="/login">Back to Login</Link>
                </div>
              </div>
    )
  }
}

export default Login;
