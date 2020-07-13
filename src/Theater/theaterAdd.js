import React, {Component} from 'react';
import { connect } from 'react-redux';
import SanitizedHTML from 'react-sanitized-html';

import { process_submit } from '../constants/constants';
import { getPosition } from '../constants/helpers';

class AddTheater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      city: null,
      state: '0',
      height: null,
      scroll: null,
      error: null
    };
    this.errorRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
  }

  componentDidMount() {
    this.setState(getPosition());
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = process_submit(e.target.elements);
    var error='';
    if (!this.state.name) error+='<li>You must provide a theater name.</li>';
    if (!this.state.city) error+='<li>You must provide a city.</li>';
    if (this.state.state==='0') error+='<li>You must provide a state.</li>';

    if ( error !== '' ){
      error='<h4>Errors</h4><ol>'+error+'</ol>';
      this.setState({ error });
      this.errorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      return;
    }
    this.props.add_theater(body);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  onDropdownSelected(e){
    this.setState({ state: e.target.value });
  }

  render() {
    return (<div className='overlay'>
            <div class="overlay-container" ref={this.errorRef}>
                <div class="close" onClick={() => { this.props.theater_form() }} >&times;</div>
                <h2 className='form-title'>Add Theater</h2>
                { (this.state.error)
                  ? <div className="error" ><SanitizedHTML html={this.state.error}/></div>
                  : null
                }
                <form onSubmit={this.handleSubmit}>

                    <div className='form-group'>
                      <div className="label">Name:</div>
                      <input  id="name"
                              type="text"
                              name="name"
                              value={ this.state.name }
                              onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                      <div className="label">City:</div>
                      <input  id='city'
                              type="text"
                              name="city"
                              value={ this.state.city }
                              onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                      <div className="label">State:</div>
                      <select id="state"
                              type="select"
                              name="state"
                              value={ this.state.state }
                              onChange={this.onDropdownSelected}>
                        {this.props.states}
                      </select>
                    </div>
                  <input
                        className='form-button'
                        type="submit"
                        value="Submit" />
                </form>
              </div>
            </div>
        )
  }
}

export default AddTheater;