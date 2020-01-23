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
                  username: null,
                  password: null,
                  message: null
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
                <form onSubmit={this.handleLogin}>
                      <h2>Log In</h2>

                      {(this.props.User.message)
                        ? <div class="error">{ this.props.User.message }</div>
                        : null
                      }

                      <input
                          type='text'
                          className='login'
                          id='username'
                          key='username'
                          name='username'
                          value={this.state.username}
                          onChange={this.handleChange}/>
                      <input
                          type='password'
                          className='login'
                          id='password'
                          key='password'
                          name='password'
                          value={this.state.password}
                          onChange={this.handleChange}/>
                  <input className='subbutt' id='login' type="submit" value='Log In' />
                  <Link className="link column accent" to="/register">Register</Link>
                </form>

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
