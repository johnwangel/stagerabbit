import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import SanitizedHTML from 'react-sanitized-html';

class Article extends Component {
  render() {
        return   ( <div className="search_result" key={this.props.idx}>
                      <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='number_long'>{this.props.number}</div>
                              </td>
                              <td>
                                <Link className='website' to={`/randh`}>{this.props.title}</Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                  )
  }
}
export default Article;