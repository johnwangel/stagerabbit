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
    this.state = { show_prods:0 };
    this.toggleProds=this.toggleProds.bind(this);
  }

  toggleProds(number){
    this.setState({show_prods:number});
  }

  render() {
    return ( <div className='show_results'>
              <h2 className="main-page main-column search">Production Results</h2>
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
                            return <div className="result-item">
                                      <div className='number'>{idx+1}</div>
                                      <div className='title'>
                                        <SanitizedHTML html={ item.title } />
                                      </div>
                                      <Link className='website' to={`/theater/${item.theater_id}`}>
                                        <SanitizedHTML html={item.theater_name} />
                                      </Link><SanitizedHTML html={ `${item.city_name}, ${item.state_abbr}` } />
                                      <div className="dates">({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})</div>
                                  </div>
                          })
                      }
                  </div>
                : null
                }
                { ( this.props.Prods && this.props.Prods.previous && this.props.Prods.previous.length>0)
                  ? <div className={ (this.state.show_prods===1) ? 'searchContent main-column' : 'searchContent main-column hide' } >
                        { this.props.Prods.previous.map((item, idx) => {
                              return <div className="result-item">
                                      <div className='number'>{idx+1}</div>
                                      <div className='title'>
                                        <SanitizedHTML html={ item.title } />
                                      </div>
                                      <Link className='website' to={`/theater/${item.theater_id}`}>
                                        <SanitizedHTML html={item.theater_name} />
                                      </Link><SanitizedHTML html={ `${item.city_name}, ${item.state_abbr}` } />
                                      <div className="dates">({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})</div>
                                  </div>                            })
                        }
                    </div>
                  : null
                }
                { ( this.props.Prods && this.props.Prods.upcoming && this.props.Prods.upcoming.length===0 && this.props.Prods.previous && this.props.Prods.previous.length===0 )
                  ? <div>No productions found.</div>
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