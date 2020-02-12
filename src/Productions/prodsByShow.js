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
  }

  render() {
    console.log('prods',this.props)
    return ( <div className='show_results'>
              <h2>Results</h2>
                { ( this.props.Prods && this.props.Prods.upcoming && this.props.Prods.upcoming.length>0)
                  ? <div>
                      <h3>Upcoming Productions</h3>
                      <ol>
                        { this.props.Prods.upcoming.map((item, idx) => {
                              return <li>
                                  <span className='title'><SanitizedHTML html={ item.title } /></span>, <Link className='website' to={`/theater/${item.theater_id}`}>
                                  <SanitizedHTML html={item.theater_name} /></Link>,&nbsp;<SanitizedHTML html={ item.city_name} />,&nbsp;{ item.state_abbr }
                                  <span className="dates">({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})</span></li>
                            })
                        }
                      </ol>
                    </div>
                  : null
                }
                { ( this.props.Prods && this.props.Prods.previous && this.props.Prods.previous.length>0)
                  ? <div>
                      <h3>Past Productions</h3>
                      <ol>
                        { this.props.Prods.previous.map((item, idx) => {
                              return <li>
                                  <span className='title'><SanitizedHTML html={ item.title } /></span>, <Link className='website' to={`/theater/${item.theater_id}`}>
                                  <SanitizedHTML html={item.theater_name} /></Link>,&nbsp;<SanitizedHTML html={ item.city_name} />,&nbsp;{ item.state_abbr }
                                  <span className="dates">({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})</span></li>
                            })
                        }
                      </ol>
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