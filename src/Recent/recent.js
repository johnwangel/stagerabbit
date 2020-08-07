import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import SanitizedHTML from 'react-sanitized-html';

class Recent extends Component {
  render() {
        return   ( <div className="search_result" key={this.props.idx} id={this.props.item.id}>
                      <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='number_long'>{this.props.number}</div>
                              </td>
                              <td>
                                <Link className='website' to={`/theater/${this.props.item.id}/0`}>{this.props.item.name}</Link>
                                <div className="address">{this.props.item.city}, {this.props.item.state_abbr}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                  )
  }
}
export default Recent;