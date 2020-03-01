import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";


import  { getProfileFetch } from './Register/actions';

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
import ProdByShow from './Productions/prodsByShow';
import TheaterEmails from './Theater/theaterEmails';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getProfileFetch();
  }

  render() {
    return (
              <Router basename="/">
                <div className='MainBody'>
                  <Helmet>
                    <title>StageRabbit</title>
                    <meta name="keywords" content="Find Productions Theatre Company Theater Amateur Professional Community Summer Stock Children's Regional High School College Shows Drama Musicals Revues Near Me Comedy Plays" />
                    <meta
                      name="description"
                      content="Free searchable database of community theaters and productions across the United States" />
                    <script data-ad-client="ca-pub-9593088864998919" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                  </Helmet>
                  <Header />
                  <Route exact path="/" component={Home} />
                  <Route path="/edit" component={Main} />
                  <Route path="/theater/:id" component={Main} />
                  <Route path="/instructions" component={Instructions} />
                  <Route path="/login" component={Login} />
                  <Route path="/password" component={Password} />
                  <Route path="/register/:token" component={Register} />
                  <Route path="/prodsbyshow/:id" component={ProdByShow} />
                  <Route path="/emails" component={TheaterEmails} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/aboutus" component={About} />
                  <Route path="/reset" component={Reset} />
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
    }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);






