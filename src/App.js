import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Main from './Main/Main';
import Home from './Home/Home';
import Header from "./Header/header";
import Register from './Register/register';


const App = () => (
    <Router basename="/">
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/edit" component={Main} />
        <Route path="/theater/:id" component={Main} />
        <Route path="/register" component={Register} />
        <div className='footer'>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/"         title="Flaticon">www.flaticon.com</a></div>
      </div>
    </Router>
)

export default App;


