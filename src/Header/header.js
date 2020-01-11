import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

import  { logout } from '../Register/actions';
import { process_submit } from '../constants/constants';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      username: null,
      password: null,
      loggedin: false,
      hideLogin: true,
      showMenu: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.ToggleMenu = this.ToggleMenu.bind(this);
  }

  componentDidUpdate() {
    if ( this.props.User && this.props.User.loggedin !== this.state.loggedin ) {
      this.setState({ loggedin: this.props.User.loggedin });
    }
  }

  ToggleMenu(){
    this.setState( { showMenu : !this.state.showMenu } )
  }


  handleLogout(e) {
    this.props.logout();
  }

  render() {
    //console.log(this.props)
    return (
      <div className="nav">
        <div className="logo">
          <span className="title">StageRabbit</span>
          <span className="subtitle">.&nbsp;.&nbsp;.&nbsp;great theater is just a hop away!</span>
        </div>
        <ul>
          { ( this.props.User.level>1 )
            ? <li><Link to={`/theater/${ this.props.User.tid }`}>Edit</Link></li>
            : null
          }
          { ( this.props.User.level>1 )
            ? <li><Link to={`/emails`}>Emails</Link></li>
            : null
          }
        </ul>
        <div className='nav-icons'>
          <Link className='home' to="/">&#8962;</Link>
          <div className='menu'>
              <div>&#9776;</div>
              <div className='dropdown_menu' >
                { ( this.state.loggedin)
                  ? <div className="menu_item" onClick={this.handleLogout}>Logout</div>
                  : <Link className="menu_item" onClick={ this.ToggleMenu } to="/login">Log In</Link>
                }
                { ( this.state.loggedin)
                  ? null
                  : <Link className="menu_item" onClick={ this.ToggleMenu } to="/register">Register</Link>
                }
                <div className="menu_item">About Us</div>
                <Link className="menu_item" onClick={ this.ToggleMenu } to="/contact">Contact</Link>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch( logout() )
    }
  }
}

export default Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);