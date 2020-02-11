import React, {Component} from 'react';
import { connect } from 'react-redux';

class TheaterInfo extends Component {
  constructor(props) {
    super(props);
    this.value = React.createRef();
    var val = (this.props.label === 'specialty_id') ? 0 : this.props.value;
    this.state = { [this.props.label] :  val };
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  onDropdownSelected(e){
    this.setState({ [this.props.label] : parseInt(e.target.value) });
  }

  render() {
    let uneditable = !this.props.edit;
    let info = { field: this.props.label, value: this.state[this.props.label]}



    return ( <tbody>
                { ( uneditable )
                    ? <tr className="theater_item">
                        <td className="table-label">{this.props.label}:</td>
                        <td className="table-button">
                          <span className="table-edit"
                            onClick={ () => { this.props.edit_it(this.props.label) } }>
                              &#9998;
                          </span>
                        </td>
                        { (this.props.label==='website')
                          ? <td className="table-field"><a className='website' target='_blank' href={ this.props.value }>{ this.props.value }</a></td>
                          : <td className="table-field">{ this.props.value }</td>
                        }
                      </tr>
                    : <tr className="theater_item">
                        <td className="table-label">{this.props.label}:</td>
                        <td className="table-button">
                          <span className="table-submit"
                            onClick={ () => { this.props.submit_it(info) } }>
                              &#x2714;
                          </span>
                          <span className="table-return"
                            onClick={ () => { this.props.return_it() } }>
                              &#8634;
                          </span>
                        </td>
                        { ( this.props.label === 'specialty' )
                          ? <td className="table-field">
                              <select id="specialty_id"
                                    type="select"
                                    name="specialty_id"
                                    value={ this.state[this.props.label] }
                                    onChange={this.onDropdownSelected}>
                                {this.props.specialites}
                              </select>
                            </td>
                          : <td className="table-field">
                              <input
                                id={this.props.id}
                                key={ this.props.id }
                                type="text" name={this.props.label}
                                value={this.state[this.props.label]}
                                onChange={this.handleChange}
                                ref={this.value} />
                              </td>
                        }
                    </tr>
                }
              </tbody>
            )
  }
}

export default TheaterInfo;





