import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { GET_POST_HEADER, URL, process_submit } from '../constants/constants.js';


import  { login } from '../Register/actions';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state={ code: null, pass1: null, pass2: null, message: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleReset(e) {
    e.preventDefault();

    if (this.state.pass1!==this.state.pass2){
      this.setState({message: 'Sorry, passwords do not match.'});
      return;
    }
    // if ( !this.state.code || this.state.code.length < 5 ){
    //   this.setState({message: 'Please enter a valid code.'});
    //   return;
    // }

    let body = process_submit(e.target.elements);
    GET_POST_HEADER.body = JSON.stringify(body);
    fetch(`${URL}auth/reset`, GET_POST_HEADER)
    .then(response => response.json())
    .then( data => {
      console.log('message',data);
      if (data.message === 'OK'){
        window.location.href='/login';
      } else {
        this.setState({ message: data.message });
      }
    })
    .catch( err => this.setState({ message: err.message }) );
  }

  render() {
    return (
              <div className='loginPage'>
                <h2 className="main-page main-column">Log In</h2>
                <div className='login-form main-column'>

                  {(this.state.message)
                      ? <div className="error">{ this.state.message }</div>
                      : null
                  }

                  <form onSubmit={this.handleReset}>
                    <div className='form-group'>
                      <div className="search-label">Reset Code:</div>
                      <input
                          type='text'
                          id='code'
                          key='code'
                          name='code'
                          value={this.state.code}
                          placeholder="Enter Your Reset Code from Email"
                          onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                      <div className="search-label">New Password:</div>
                      <input
                          type='text'
                          id='pass1'
                          key='pass1'
                          name='pass1'
                          value={this.state.pass1}
                          placeholder="New password"
                          onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                      <div className="search-label">Retype Password:</div>
                      <input
                          type='text'
                          id='pass2'
                          key='pass2'
                          name='pass2'
                          value={this.state.pass2}
                          placeholder="Retype New password"
                          onChange={this.handleChange}/>
                    </div>
                    <input  className='form-button'
                            id='password'
                            type="submit"
                            value='Reset' />
                  </form>
                  <div className="links">
                    <Link className="link" to="/login">Back to Login</Link>
                  </div>
                </div>
              </div>
    )
  }
}

export default Reset;
