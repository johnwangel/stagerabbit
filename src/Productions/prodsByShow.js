import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import {  prodsByShow } from './actions';

const moment = require('moment');

class ProdByShow extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShow(this.props.match.params.id);
  }

  render() {
    return ( <div className='show_results'>
              <h2>Results</h2>
                { ( this.props.Prods && this.props.Prods.data && this.props.Prods.data.length>0)
                  ? <ol>
                      { this.props.Prods.data.map((item, idx) => {
                            return <li>
                                <span className='title'>{ item.title }</span>, <Link className='website' to={`/theater/${item.theater_id}`}>
                                {item.theater_name}</Link>,&nbsp;{ item.city_name},&nbsp;{ item.state_abbr }
                                <span className="dates">({moment(item.start_date).format('M/D/YY')}&ndash;{moment(item.end_date).format('M/D/YY')})</span></li>
                          })
                      }
                    </ol>
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