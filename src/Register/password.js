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
                <h2 className="main-page main-column">Password Reset</h2>
                <div className='login-form main-column'>
                  {(this.state.message)
                      ? <div className="error">{ this.state.message }</div>
                      : null
                  }

                  <p>Submit your registration email to recieve instructions for resetting your password.</p>

                  <form onSubmit={this.handleReminder}>
                    <div className='form-group'>
                        <div className="search-label">Registration Email:</div>
                        <input
                            type='text'
                            id='username'
                            key='username'
                            name='username'
                            value={this.state.email}
                            placeholder="Type your registration email here"
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <input  className='form-button'
                            id='password'
                            type="submit"
                            value='Send Reminder' />
                  </form>

                  <div className="links">
                    <Link className="link" to="/login">Back to Login</Link>
                  </div>
                </div>
              </div>
    )
  }
}

export default Login;
