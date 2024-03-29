import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { getProfileFetch, log_ip } from './Register/actions';
import { IP_KEY } from './constants/constants.js';

import Admin from './Admin/Stats';
import Main from './Main/Main';
import Home from './Home/Home';
import Header from "./Header/header";
import Instructions from './About/instructions';
import Login from './Register/login';
import Reset from './Register/reset';
import Password from './Register/password';
import Register from './Register/register';
import About from './About/about';
import Contact from './Contact/contact';
import Faves from './Favorite/favorite_page';
import ProdByShow from './Productions/prodsByShow';
import TheaterEmails from './Theater/theaterEmails';
import RandH from './Articles/randh';
import JHW from './Articles/jhw';
import NS from './Articles/ns';
import SOND from './Articles/sondheim';
import SHK from './Articles/shakespeare';

class App extends Component {
  constructor(props) {
    super(props);
    fetch(`https://geolocation-db.com/json/${IP_KEY}`)
     .then(res => res.json())
     .then(json => this.props.log_ip(json) );
  }

  componentDidMount(){
    this.props.getProfileFetch();
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.setAttribute('data-ad-client', 'ca-pub-9593088864998919');
    script.async = true;
    document.head.appendChild(script);
  }

  render() {
    return (
              <Router basename="/">
                <div className='MainBody'>
                  <Helmet>
                    <title>StageRabbit</title>
                    <meta name="keywords" content="Find Search Stage Live Productions Theatre Company Theater Amateur Entertainment Professional Community Summer Stock Children's Regional High School College Shows Drama Musicals Revues Near Me Comedy Plays" />
                    <meta
                      name="description"
                      content="Free searchable database of community theaters and productions across the United States" />
                  </Helmet>
                  <Header />
                  <Route exact path="/" component={Home} />
                  <Route path="/edit" component={Main} />
                  <Route path="/theater/:id/:from" component={Main} />
                  <Route path="/instructions" component={Instructions} />
                  <Route path="/login" component={Login} />
                  <Route path="/password" component={Password} />
                  <Route path="/register/:token" component={Register} />
                  <Route path="/favorites" component={Faves} />
                  <Route path="/prodsbyshow/:id" component={ProdByShow} />
                  <Route path="/emails" component={TheaterEmails} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/aboutus" component={About} />
                  <Route path="/reset" component={Reset} />
                  <Route path="/randh" component={RandH} />
                  <Route path="/jhw" component={JHW} />
                  <Route path="/ns" component={NS} />
                  <Route path="/sondheim" component={SOND} />
                  <Route path="/shakespeare" component={SHK} />
                  <Route path="/stats" component={Admin} />
                  <div className='footer'>StageRabbit, Jersey City, NJ&nbsp;&nbsp;<a href='mailto:info@stagerabbit.com'>info@stagerabbit.com</a></div>
                </div>
              </Router>
            )
  }
}


const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    getProfileFetch: () => {
      dispatch( getProfileFetch() )
    },
    log_ip: (data) => {
      dispatch( log_ip(data) )
    }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);