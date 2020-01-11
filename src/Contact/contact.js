import React, {Component} from 'react';
import { GET_POST_HEADER, URL } from '../constants/constants.js';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        message: ''
      };
  }

  onNameChange(e) {
    this.setState({name: e.target.value})
  }

  onEmailChange(e) {
    this.setState({email: e.target.value})
  }

  onMessageChange(e) {
    this.setState({message: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    var body = JSON.stringify(this.state)

    GET_POST_HEADER.body= JSON.stringify(body);
    fetch(`${URL}send/`, GET_POST_HEADER )
      .then( response => ( response.json() ) )
      .then( response => {
          if (response.status === 'success'){
            alert("Message Sent.");
            this.resetForm()
          } else if(response.status === 'fail') {
            alert("Message failed to send.");
          }
      });
  }

  render() {
   return(
      <div className="contact">
        <h1>Contact Us</h1>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button type="submit" className="subbutt">Submit</button>
        </form>
      </div>
   );
  }
}

export default Contact;