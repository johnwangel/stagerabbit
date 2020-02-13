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
      <div className='loginPage'>
        <h2 className="main-page main-column">Contact Us</h2>
        <div className='login-form main-column'>
            { (this.state.status)
              ? <div className='email_status'>{this.state.status}</div>
              : null
            }
            <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
              <div className="form-group">
                <div className="search-label">Name:</div>
                <input
                      type="text"
                      value={this.state.name}
                      onChange={this.onNameChange.bind(this)}
                      placeholder="Your name"
                      required
                  />
              </div>
              <div className="form-group">
                  <div className="search-label">Email address:</div>
                  <input  type="email"
                          aria-describedby="emailHelp"
                          value={this.state.email}
                          onChange={this.onEmailChange.bind(this)}
                          placeholder="Your Email Address"
                          required />
              </div>

              <div className="form-group">
                <div className="search-label">Subject:</div>
                <select
                    className="form-select wide "
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
                  <div className="search-label">Message:</div>
                  <textarea
                        rows="10" value={this.state.message}
                        onChange={this.onMessageChange.bind(this)}
                        required
                    />
              </div>
              <button type="submit" className="form-button">Submit</button>
            </form>
          </div>
      </div>
   );
  }
}

export default Contact;