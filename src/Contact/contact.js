import React, {Component} from 'react';
import { GET_POST_HEADER, URL } from '../constants/constants.js';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        message: '',
        subject_select: 'General Question',
        status: null
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

  onDropdownSelected(e){
    this.setState({ [e.target.id] : e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    GET_POST_HEADER.body= JSON.stringify(this.state);
    fetch(`${URL}contact`, GET_POST_HEADER )
      .then( response => ( response.json() ) )
      .then( response => {
          var thisstate = {
                            name: '',
                            email: '',
                            message: '',
                            subject_select: 'General Question',
                          };

          if (response.status === 'success'){
            thisstate.status ='Thank you for your message!';
          } else if(response.status === 'fail') {
            thisstate.status ='Oh no! There was a problem sending your message. Please try again.'
          }
          this.setState( thisstate );

          setTimeout(
              function() {
                  this.setState({status: null});
              }
              .bind(this),
              3000
          );

      });
  }


  render() {
   return(
      <div className="contact">
        <h1>Contact Us</h1>
        { (this.state.status)
          ? <div className='email_status'>{this.state.status}</div>
          : null
        }
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input  type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={this.state.email}
                      onChange={this.onEmailChange.bind(this)} />
          </div>

          <div className="form-group">
          <label>Subject:</label>
            <select
                id="subject_select"
                type="select"
                name="subject"
                value={this.state.subject_select}
                onChange={this.onDropdownSelected.bind(this)}>
              <option key='subj1' value="General Question">General Question</option>
              <option key='subj2' value="New Admin Account Request">New Admin Account Request</option>
              <option key='subj3' value="Suggested Theater Company Addition">Suggested Theater Company Addition</option>
              <option key='subj4' value="Request a Data Change">General Question</option>
              <option key='subj5' value="Compliment or Suggestion">Compliment or Suggestion</option>
            </select>
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