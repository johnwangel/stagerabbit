import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import SanitizedHTML from 'react-sanitized-html';

const moment = require('moment');

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log('props',this.props)
        return   ( <div className="search_result" key={this.props.idx} id={this.props.item.id}>

                    { (this.props.type==='1')
                      ? <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='number_long'>{this.props.number}</div>
                              </td>
                              <td>
                                <Link className='website' to={`/theater/${this.props.item.id}`}>{this.props.item.name}</Link>
                                <div className="address">{this.props.item.city}, {this.props.item.abbr} ({parseInt(this.props.item.distance)} miles)</div>
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>{ (this.props.prod.length > 0)
                                    ? <div className="upcoming">
                                          <div className="next">Up Next:</div>
                                          <div className="prod"><SanitizedHTML html={ this.props.prod[0][0].title }/></div>
                                          <div className="dates">{moment.utc(this.props.prod[0][0].start_date).format('M-D')} to {moment.utc(this.props.prod[0][0].end_date).format('M-D')}</div>
                                        </div>
                                      : null
                                    }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      : null
                    }

                    { (this.props.type==='2')
                      ? <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='number_long'>{this.props.number}</div>
                              </td>
                              <td>
                                <Link className='website' to={`/theater/${this.props.item.id}`}><SanitizedHTML html={this.props.item.name}/></Link>{this.props.item.city}, {this.props.item.abbr}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      : null
                    }

                    { (this.props.type==='3')
                      ? <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='number_long'>{this.props.number}</div>
                              </td>
                              <td>
                                <Link className='website' to={`/prodsbyshow/${this.props.item.id}`}><SanitizedHTML html={this.props.item.title} /></Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        : null
                    }

                    { (this.props.type==='4')
                      ? <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className='number_long'>{this.props.number}</div>
                              </td>
                              <td>
                                <Link className='website' to={`/theater/${this.props.item.theater_id}/4`}>
                                  <SanitizedHTML html={this.props.item.title}/>
                                </Link>
                                <div className='theater_name'><SanitizedHTML html={this.props.item.theater_name}/>
                                {this.props.item.theater_city}, {this.props.item.state_abbr}</div>
                                { (this.props.item.no_repeat)
                                    ? <div className="dates">{moment.utc(this.props.item.date_start).format('MMM Do')}</div>
                                    : <div className="dates">{moment.utc(this.props.item.date_start).format('MMM Do')} to {moment.utc(this.props.item.date_end).format('MMM Do')}</div>
                                }
                                { (this.props.item.time_start)
                                  ? <div className='time'>{ this.props.item.time_start }</div>
                                  : null
                                }

                              </td>
                            </tr>
                          </tbody>
                        </table>
                        : null
                    }



                  </div>
                )
    }

}

const mapStateToProps = (state) => {
  return { ...state };
}

Results = connect(
  mapStateToProps
)(Results);

export default Results;