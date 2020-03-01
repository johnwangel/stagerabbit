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
    return (
      <div className="nav">
        <div className="logo">
          <span className="title">StageRabbit</span>
          <span className="subtitle">.&nbsp;.&nbsp;.&nbsp;great theater is just a hop away!</span>
        </div>
{/*        <ul>

          { ( this.props.User.level>1 )
            ? <li><Link to={`/emails`}>Emails</Link></li>
            : null
          }
        </ul>*/}
        { (this.props.User.level > 1)
          ? <div className="welcome">
             <div className="marquee">Welcome, {this.props.User.name}!</div>
            </div>
          : null
        }

        <div className='nav-icons'>
          <Link className='home icon' to="/">&#128269;</Link>
          { ( this.props.User.level>1 )
            ? <Link className="edit icon" to={`/theater/${ this.props.User.tid }`}>&#9998;</Link>
            : null
          }
          <div className='menu'>
              <div className="dm icon">&#9776;</div>
              <div className='dropdown_menu' >
                <Link className="menu_item" onClick={ this.ToggleMenu } to="/">Search</Link>
                { ( this.props.User.level>1 )
                  ? <Link className="menu_item" to={`/theater/${ this.props.User.tid }`}>Edit</Link>
                  : null
                }
                { ( this.props.User.level>1 )
                  ? <Link className="menu_item" to={`/instructions`}>Instructions</Link>
                  : null
                }
                { ( this.state.loggedin)
                  ? <div className="menu_item" onClick={this.handleLogout}>Logout</div>
                  : <Link className="menu_item" onClick={ this.ToggleMenu } to="/login">Log In</Link>
                }
                { ( this.state.loggedin)
                  ? null
                  : <Link className="menu_item" onClick={ this.ToggleMenu } to="/register/0">Register</Link>
                }
                <Link className="menu_item" onClick={ this.ToggleMenu } to="/aboutus">About Us</Link>
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