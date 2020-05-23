import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  getClients } from './actions';
import SanitizedHTML from 'react-sanitized-html';

const moment = require('moment');

class Admin extends Component {
  constructor(props) {
    super(props);
    this.props.getClients();
  }

  render() {

    const clients = this.props.Admin.clients;
    //console.log(clients);
    return (
      <div className="aboutus">
        <div className="aboutus_column article">
          { clients.map( (p, idx) => {
                  return (
                    <div key={ idx }>
                      {p.city} | {p.state} | {p.country} | {moment.utc(p.created_at).format('LLLL')}
                    </div>
                  )
              })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    getClients : () => {
      dispatch( getClients() )
    }
  }
}

Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);

export default Admin;