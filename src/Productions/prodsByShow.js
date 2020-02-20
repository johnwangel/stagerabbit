import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import {  prodsByShow } from './actions';

import SanitizedHTML from 'react-sanitized-html';

const moment = require('moment');

class ProdByShow extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShow(this.props.match.params.id);
    this.state = { show_prods:0, name: null };
    this.toggleProds=this.toggleProds.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Prods !== this.props.Prods){
      let p=this.props.Prods;

      if (p.upcoming.length>0) {
        this.setState({name:p.upcoming[0].title});
      } else if (p.previous.length>0) {
        this.setState({name:p.previous[0].title});
      }
    }

  }

  toggleProds(number){
    this.setState({show_prods:number});
  }

  render() {
    return ( <div className='show_results'>
              <h2 className="main-page main-column search">Production Results</h2>
              { (this.state.name)
                ? <div className='show-title main-column'>
                    <SanitizedHTML html={ this.state.name } />
                  </div>
                : null
              }
              <div className="toggle main-column">
                <div  id="upcoming1"
                      className={ (this.state.show_prods===0) ? "toggle-button active" : "toggle-button" }
                      onClick={() => { this.toggleProds(0) } }>
                    Upcoming
                </div>
                <div  id="previous1"
                      className={ (this.state.show_prods===1) ? "toggle-button active" : "toggle-button" }
                      onClick={() => { this.toggleProds(1) } }>
                    Past
                </div>
              </div>

              { ( this.props.Prods && this.props.Prods.upcoming && this.props.Prods.upcoming.length>0)
                ? <div className={ (this.state.show_prods===0) ? 'searchContent main-column' : 'searchContent main-column hide' } >
                      { this.props.Prods.upcoming.map((item, idx) => {
                            return <div className="search_result" key={this.props.idx}>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div className='number_long'>{idx+1}</div>
                                            </td>
                                            <td>
                                              <Link className='website' to={`/theater/${item.theater_id}`}>
                                                <SanitizedHTML html={item.theater_name} />
                                              </Link>
                                              <SanitizedHTML html={ `${item.city_name}, ${item.state_abbr}` } />
                                              <div className="dates">({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})</div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                          })
                      }
                  </div>
                : <div className="noresults">No upcoming productions found.</div>
                }
                { ( this.props.Prods && this.props.Prods.previous && this.props.Prods.previous.length>0)
                  ? <div className={ (this.state.show_prods===1) ? 'searchContent main-column' : 'searchContent main-column hide' } >
                        { this.props.Prods.previous.map((item, idx) => {
                              return <div className="search_result" key={this.props.idx}>
                                      <table>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div className='number_long'>{idx+1}</div>
                                            </td>
                                            <td>
                                              <Link className='website' to={`/theater/${item.theater_id}`}>
                                                <SanitizedHTML html={item.theater_name} />
                                              </Link>
                                              <SanitizedHTML html={ `${item.city_name}, ${item.state_abbr}` } />
                                              <div className="dates">
                                                ({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                          })
                        }
                    </div>
                  : <div className="noresults">No previous productions found.</div>
                }
                { ( this.props.Prods && this.props.Prods.upcoming && this.props.Prods.upcoming.length===0 && this.props.Prods.previous && this.props.Prods.previous.length===0 )
                  ? <div className="noresults">No productions found.</div>
                  : null
                }

              </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    prodsByShow : show_id => {
      dispatch( prodsByShow( show_id ) )
    }
  }
}

ProdByShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProdByShow);

export default ProdByShow;