import React, {Component} from 'react';
import { connect } from 'react-redux';

import { process_submit } from '../constants/constants';

class AddTheater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      city: '',
      state: 0,
      window: null,
      scroll: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
  }

  componentDidMount() {
    var body = document.body,
    html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    this.setState({ scroll: window.scrollY, window: height });
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = process_submit(e.target.elements);
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
    return (<div className='overlay' style={{height: this.state.window + 'px'}}>
            <div class="add_show" style={{marginTop: this.state.scroll + 'px'}}>
                <div class="close" onClick={() => { this.props.theater_form() }} >&times;</div>
                 <h1>Add Theater</h1>
                <form onSubmit={this.handleSubmit}>

                    <div>
                      <span className='runin'>Name:</span>
                      <input id="name" type="text" name="name" value={ this.state.name } onChange={this.handleChange} />
                    </div>
                    <div>
                      <span className='runin'>City:</span>
                      <input id='city' type="text" name="city" value={ this.state.city } onChange={this.handleChange} />
                    </div>
                    <div>
                      <span className="runin">State:</span>
                      <select id="state"
                              type="select"
                              name="state"
                              value={ this.state.state }
                              onChange={this.onDropdownSelected}>
                        {this.props.states}
                      </select>
                    </div>
                  <input type="submit" value="Submit" className="subbutt" />
                </form>
              </div>
            </div>
        )
  }
}

export default AddTheater;