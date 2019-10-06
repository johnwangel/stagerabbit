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
    return (
      <div className="theater_item">
        {(edit)
            ? <div>
                <span
                    className="runin clickable"
                    onClick={() => { this.props.edit_it(this.props.label) }}>
                      {this.props.label}:
                </span>{ this.props.value }
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
    )
  }
}

export default TheaterInfo;