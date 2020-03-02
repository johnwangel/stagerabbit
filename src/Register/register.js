import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { GET_POST_HEADER } from '../constants/constants.js';
import { process_submit } from '../constants/constants';

import  { register_user } from '../Register/actions';

class Register extends Component {
  constructor(props) {
    super(props);

    let token= (this.props.match &&
                this.props.match.params &&
                this.props.match.params.token &&
                this.props.match.params.token !== '0')
                ? this.props.match.params.token
                : null;

    this.state={  selectedOption: (token) ? 'admin' :'general',
                  token: (token) ? token : null,
                  username: null,
                  password: null,
                  fname: null,
                  lname: null,
                  role: null,
                  email: null,
                  phone: null,
                  loggedin: false,
                  optin: false
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.handleOptin = this.handleOptin.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.User && this.props.User.name !== prevProps.User.name){
      this.setState({ loggedin: true });
    }
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  handleOptin(){
    this.setState({optin: !this.state.optin });
  }

  handleRegSubmit(e){
    e.preventDefault();
    let body = process_submit(e.target.elements);
    body.optin = e.target.elements.optin.checked;

    if (e.target.elements.account_type[0].checked){
      body.account_type='general';
    } else if  (e.target.elements.account_type[1].checked) {
      body.account_type='admin';
    }
    this.props.register_user(body);
  }

  render() {
    console.log(this.props);
    return (
      <div className='loginPage'>
          <h2 className="main-page main-column">Register</h2>
          { (this.state.loggedin)
            ? (this.props.User.level===2)
              ? <Redirect to={ `/theater/${this.props.User.tid}`}/>
              :<Redirect to='/'/>
            : <div className='login-form main-column'>
                  <p>
                    StageRabbit is free to use for the general public.
                    No account is required to search our extensive database of regional, community, and
                    school theater productions.
                  </p>
                  <p>
                    We also offer two types of registered accounts:
                  </p>
                  <h2>Theater Company Administrator</h2>
                  <p>
                    If you are associated with a listed theater company,
                    you can request an account to become an Administrator of your
                    company&rsquo;s content.
                    <ol>
                      <li>
                          Request a token to authorize your account by sending an email
                          to <a className='inline' href='mailto:info@stagerabbit.com'>
                            info@stagerabbit.com</a> with <strong>your name</strong> and <strong>your
                            company name and location</strong>.
                      </li>
                      <li>
                          When you have your token, return to this page, and complete the registration form, including the token.
                      </li>
                      <li>
                          Once you have registered, you will have access to update all information related to your
                          theater company and productions. (Note: All updates are subject to approval.)
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

                    <div className='form-group radio'>
                      <div className="search-label">Account Type:</div>
                        <div className="radio-group">
                          <input  type="radio"
                                id="acct-gen"
                                name='account_type'
                                checked={ this.state.selectedOption === 'general' }
                                value='general'
                                onChange={this.handleOptionChange} />
                          <span className="custom-radio"></span>
                          <label htmlFor='acct-gen' className="radio-label">General</label>
                        </div>
                        <div className="radio-group">
                          <input  type="radio"
                                id="acct-admin"
                                name="account_type"
                                value='admin'
                                checked= { this.state.selectedOption === 'admin' }
                                onChange={this.handleOptionChange} />
                          <span htmlFor='acct-admin' className="custom-radio"></span>
                          <span className="radio-label">Admin</span>
                        </div>
                      </div>
                      <div className='form-group'>
                        <div className="search-label">Token:</div>
                        <input  id="token"
                                key="token"
                                type="text"
                                name="token"
                                value={this.state.token}
                                onChange={this.handleChange}
                                placeholder="Required only for Theater Admin accounts." />
                      </div>

                      <div className='form-group'>
                        <div className="search-label">Email:</div>
                        <input  id="username"
                                key="username"
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="Email address"
                                required />
                          <div className='note'>(This will be your username.)</div>
                      </div>

                      <div className='form-group'>
                        <div className="search-label">Password:</div>
                        <input  id="password"
                                key="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Password"
                                required
                                />
                      </div>

                      <div className='form-group'>
                        <div className="search-label">First Name:</div>
                        <input  id="fname"
                                key="fname"
                                type="text"
                                name="fname"
                                value={this.state.fname}
                                placeholder="First Name"
                                onChange={this.handleChange}
                              />
                      </div>

                      <div className='form-group'>
                        <div className="search-label">Last Name:</div>
                        <input  id="lname"
                                key="lname"
                                type="text"
                                name="lname"
                                value={this.state.lname}
                                onChange={this.handleChange}
                                placeholder="Last Name"
                                required
                                />
                      </div>

                      <div className='form-group'>
                        <div className="search-label">Title/Role:</div>
                        <input  id="role"
                                key="role"
                                type="text"
                                name="role"
                                value={this.state.role}
                                placeholder="Title/Role (optional)"
                                onChange={this.handleChange} />
                      </div>

                      <div className='form-group'>
                        <div className="search-label">Phone Number:</div>
                        <input  id="phone"
                                key="phone"
                                type="text"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                placeholder="Phone Number (optional)"
                              />
                      </div>

                      <div className="optin" onClick={ () => { this.handleOptin() } } >
                        <input  type="checkbox"
                                id="optin"
                                name="optin"
                                checked={ this.state.optin } />
                        <span className="custom-checkbox"></span>
                        <div className="agree">By checking this box, you give permission for the StageRabbit to
                              periodically send emails to the address associated with this account regarding
                              site enhancements and account update reminders.</div>
                      </div>

                      <input className='form-button' id='submit-reg' type="submit" value='Submit' />

                  </form>
            </div>
          }
        </div>
      )
  }
}


const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    register_user: user => {
      dispatch( register_user(user) )
    }
  }
}

export default Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
