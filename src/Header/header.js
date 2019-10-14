import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

import  { login, logout } from '../Register/actions';
import { process_submit } from '../constants/constants';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state={ username: null, password: null, loggedin: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidUpdate() {
    if ( this.props.User && this.props.User.loggedin !== this.state.loggedin ) {
      this.setState({ loggedin: this.props.User.loggedin });
    }
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleLogin(e) {
    e.preventDefault();
    let body = process_submit(e.target.elements);
    this.props.login(body);
  }

  handleLogout(e) {
    this.props.logout();
  }

  render() {
    return (
      <div className="nav">
        <div className="logo">
          <svg id="rabbit" enable-background="new 0 0 300 300" height="30" viewBox="0 0 300 300" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="#8f39ff"><circle cx="126" cy="118.371" r="8"/><circle cx="174" cy="118.371" r="8"/><ellipse cx="150" cy="142.371" rx="16" ry="8"/></g><path d="m206 262.371h-8.512c22.246-16.583 36.876-44.462 36.876-76 0-22.336-7.424-43.741-20.953-60.564-1.455-10.857-5.672-21.074-12.182-29.767.623-1.444 1.232-2.905 1.805-4.375 8.598-22.074 10.793-44.771 6.183-63.908-.613-2.546-2.434-4.63-4.874-5.58-2.439-.952-5.19-.646-7.365.813-15.556 10.45-28.74 27.457-37.389 48.11-3.154-.476-6.356-.73-9.589-.73-1.501 0-2.992.069-4.479.173-8.652-20.404-21.744-37.197-37.16-47.554-2.174-1.46-4.926-1.767-7.365-.813-2.44.95-4.261 3.034-4.874 5.58-4.61 19.139-2.415 41.835 6.183 63.908.006.014.011.028.017.042-8.538 9.537-14.029 21.38-15.733 34.099-13.529 16.823-20.953 38.229-20.953 60.564 0 31.538 14.63 59.417 36.876 76h-8.512c-4.418 0-8 3.582-8 8s3.582 8 8 8h112c4.418 0 8-3.582 8-8s-3.582-7.998-8-7.998zm-10.529-217.418c.496 12.16-1.733 25.61-6.505 38.663-4.287-3.298-8.945-6.013-13.861-8.111 5.232-11.894 12.298-22.456 20.366-30.552zm-85.603 0c7.67 7.697 14.431 17.624 19.575 28.802-4.963 1.682-9.703 3.986-14.128 6.847-4.044-12.098-5.906-24.423-5.447-35.649zm-28.232 141.418c0-19.399 6.651-37.908 18.727-52.116 1.063-1.25 1.716-2.798 1.869-4.433 2.326-24.771 22.862-43.451 47.768-43.451s45.441 18.68 47.768 43.451c.153 1.635.806 3.183 1.869 4.433 12.076 14.208 18.727 32.717 18.727 52.116 0 41.906-30.668 76-68.364 76s-68.364-34.094-68.364-76z"/></svg>
          <span className="title">StageRabbit</span>
          <span className="subtitle">.&nbsp;.&nbsp;.&nbsp;great theater is just a hop away!</span>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          { ( this.props.User.level>1 ) ? <li><Link to={`/theater/${ this.props.User.tid }`}>Edit</Link></li> : null }
        </ul>

         { ( this.state.loggedin)
            ? <div className='welcome'>Welcome {this.props.User.name }<span onClick={this.handleLogout} className='logout'>Logout</span></div>
            : <div class='reg'><div>
                <form onSubmit={this.handleLogin}>
                  <span className="nav-head">Log In</span>
                  <input
                      type='text'
                      className='login'
                      id='username'
                      key='username'
                      name='username'
                      value={this.state.username}
                      onChange={this.handleChange}
                   />
                  <input
                      type='password'
                      className='login'
                      id='password'
                      key='password'
                      name='password'
                      value={this.state.password}
                      onChange={this.handleChange}
                   />
                   <input className='subbutt' id='login' type="submit" value='Log In' />
                   <Link className="link" to="/register">Register</Link>
                </form>
                    </div>
              </div>
         }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    login: ( user ) => {
      dispatch( login( user ) )
    },
    logout: () => {
      dispatch( logout() )
    }
  }
}

export default Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);



