import React, {Component} from 'react';
import { connect } from 'react-redux';

class This_Venue extends Component {

  render() {
    const v = this.props.ven;
    return (
      <div className="venue" id={v.id} ><span className="runin">Location: </span>
        { v.venue_name}</div>
    )
  }
}

export default This_Venue;