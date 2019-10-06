import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


class TheaterResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        return   (
                  <li className="search_result" key={this.props.idx} id={this.props.thtr.id}>
                    <span className="theater_name">
                    <Link to={`/theater/${this.props.thtr.id}`}>{this.props.thtr.name}</Link>
                    </span> {this.props.thtr.city}, {this.props.thtr.abbr} ({parseInt(this.props.thtr.distance)} miles)
                  </li>
                )
    }

}

const mapStateToProps = (state) => {
  return { ...state };
}

TheaterResults = connect(
  mapStateToProps
)(TheaterResults);

export default TheaterResults;