import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import  { getProfileFetch } from './Register/actions';

import Main from './Main/Main';
import Home from './Home/Home';
import Header from "./Header/header";
import Register from './Register/register';

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
                <div>
                  <Header/>
                  <Route exact path="/" component={Home} />
                  <Route path="/edit" component={Main} />
                  <Route path="/theater/:id" component={Main} />
                  <Route path="/register" component={Register} />
                  <div className='footer'>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/"         title="Flaticon">www.flaticon.com</a></div>
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






