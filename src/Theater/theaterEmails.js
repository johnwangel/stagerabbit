import React, {Component} from 'react';
import { Link } from "react-router-dom"

import { GET_HEADER, URL } from '../constants/constants.js';
import { process_submit } from '../constants/constants';

var Moment = require('moment');

class TheaterEmails extends Component {
  constructor(props) {
    super(props);
    this.state= {emails:null};

    fetch(`${URL}contact/`, GET_HEADER )
      .then( response => ( response.json() ) )
      .then( response => {
          if (response.status === 'success'){
            this.setState( { emails: response.data } )
          } else if(response.status === 'fail') {

          }
      });
  }


  render() {
    return ( <div class="all_emails">
              { (this.state.emails && this.state.emails.length>0)
                ? this.state.emails.map( (item, idx) => {
                    return  <div key={item.email_id} className='email_item'>
                              <div><span className="runin">Date:</span>{ Moment.utc(item.created_at).format('YYYY-MM-DD HH:MM:SS') }</div>
                              <div><span className="runin">Name:</span>{ item.name }</div>
                              <div><span className="runin">Email:</span>{ item.email_address }</div>
                              <div><span className="runin">Subject:</span>{ item.subject }</div>
                              <div><span className="runin">Message:</span>{ item.message }</div>
                            </div>
                  })
                : null
              }
             </div>
    )
  }
}



export default TheaterEmails;
