import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        return   ( <li className="search_result" key={this.props.idx} id={this.props.item.id}>

                    { (this.props.type==='1')
                      ? <span><span className="theater_name">
                            <Link className='website' to={`/theater/${this.props.item.id}`}>{this.props.item.name}</Link>
                          </span>&nbsp;
                          {this.props.item.city}, {this.props.item.abbr} ({parseInt(this.props.item.distance)} miles)</span>
                        : null
                    }

                    { (this.props.type==='2')
                      ? <span><span className="theater_name">
                            <Link className='website' to={`/theater/${this.props.item.id}`}>{this.props.item.name}</Link>, {this.props.item.city}, {this.props.item.abbr}
                          </span>

                          </span>
                        : null
                    }

                    { (this.props.type==='3')
                      ? <span><span className="show_title">
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