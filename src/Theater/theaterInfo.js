import React, {Component} from 'react';
import { connect } from 'react-redux';

class TheaterInfo extends Component {
  constructor(props) {
    super(props);
    this.value = React.createRef();
    this.state = { [this.props.label] : this.props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  render() {
    let edit = !this.props.edit;
    let info = { field: this.props.label, value: this.state[this.props.label]}
    let lb = this.props.label;
    return ( <div>{ ( this.props.perm < 3 && ( lb==='id' || lb==='state' || lb==='place_id' || lb==='location_lat' || lb==='location_lng' || lb==='viewport_ne_lat' || lb==='viewport_ne_lng' || lb==='viewport_sw_lng' || lb==='viewport_sw_lat' || lb==='formatted_address' || lb==='name_alt' || lb==='token' ) )
          ? null
          : <div className="theater_item">
              {(edit)
                  ? <div>
                      <span
                          className="runin clickable"
                          onClick={() => { this.props.edit_it(this.props.label) }}>
                            {this.props.label}:
                      </span>
                      { (this.props.label==='website')
                        ? <a className='website' target='_blank' href={ this.props.value }>{ this.props.value }</a>
                        : <span>{ this.props.value }</span>
                      }
                    </div>
                  : <form>
                      <span className="runin">{this.props.label}:</span>
                      <input
                          id={this.props.id}
                          key={ this.props.id }
                          type="text" name={this.props.label}
                          value={this.state[this.props.label]}
                          onChange={this.handleChange}
                          ref={this.value} />
                      <span
                          className="clickable"
                          onClick={() => { this.props.submit_it(info) }}>Submit</span>
                    </form>
              }
            </div>
      }
    </div>


    )
  }
}

export default TheaterInfo;