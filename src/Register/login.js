import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { GET_POST_HEADER } from '../constants/constants.js';
import { process_submit } from '../constants/constants';

import  { login } from '../Register/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
                  username: undefined,
                  password: undefined,
                  message: undefined
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidUpdate(prevState){
    if (prevState.User.message!==this.props.User.message && this.props.User.message !== null ){
      this.setState.message = this.props.User.message;
    } else if (prevState.User.loggedin!==this.props.User.loggedin) {
      window.location.href='/';
    }
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({ message: null });
    let body = process_submit(e.target.elements);
    this.props.login(body);
  }

  render() {
    return (
              <div className='loginPage'>
                <h2 className="main-page main-column">Log In</h2>
                <div className='login-form main-column'>
                  <form onSubmit={this.handleLogin}>

                      {(this.props.User.message)
                        ? <div className="error">{ this.props.User.message }</div>
                        : null
                      }
                      <div className='form-group'>
                          <div className="search-label">Username:</div>
                            <input
                                type='text'
                                id='username'
                                key='username'
                                name='username'
                                value={this.state.username}
                                onChange={this.handleChange}
                                required/>
                      </div>
                      <div className='form-group'>
                          <div className="search-label">Password:</div>
                            <input
                                type='password'
                                id='password'
                                key='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                required/>
                      </div>
                      <input className='form-button' id='login' type="submit" value='Log In' />
                </form>
                <div className="links">
                  <Link className="link" to="/password">Forgot Password</Link>
                  <Link className="link" to="/register">Register</Link>
                </div>
              </div>
            </div>
    )
  }
}


const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (body) => {
      dispatch( login(body) )
    }
  }
}

export default Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
