import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const moment = require('moment');

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        return   ( <li className="search_result" key={this.props.idx} id={this.props.item.id}>

                    { (this.props.type==='1')
                      ? <span>
                          <span className="theater_name">
                            <Link className='website' to={`/theater/${this.props.item.id}`}>{this.props.item.name}</Link>
                          </span>&nbsp;
                          {this.props.item.city}, {this.props.item.abbr} ({parseInt(this.props.item.distance)} miles)

                          { (this.props.prod.length > 0)
                              ? <div className="upcoming"><span className="runin next">Next Production:</span> <span className="prod">{ this.props.prod[0][0].title }</span>&emsp;({moment.utc(this.props.prod[0][0].start_date).format('M/D/YY')}&ndash;{moment(this.props.prod[0][0].end_date).format('M/D/YY')})</div>
                              : <div className="upcoming">No Upcoming Productions Available</div>
                          }

                          </span>
                        : null
                    }

                    { (this.props.type==='2')
                      ? <span>
                          <span className="theater_name">
                            <Link className='website' to={`/theater/${this.props.item.id}`}>{this.props.item.name}</Link>, {this.props.item.city}, {this.props.item.abbr}
                          </span>
                        </span>
                      : null
                    }

                    { (this.props.type==='3')
                      ? <span>
                          <span className="show_title">
                            <Link className='website' to={`/prodsbyshow/${this.props.item.id}`}>{this.props.item.title}</Link>
                          </span>
                        </span>
                        : null
                    }

                  </li>
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