import React, {Component} from 'react';
import React, {Component} from 'react';

import SanitizedHTML from 'react-sanitized-html';
import { Link } from "react-router-dom";
const moment = require('moment');

class ShowItem extends Component {
  render() {
    console.log(this.props.number);
    let item = this.props.item;
    return (
      <div className='show_item'>
        <Link className='website' to={`/theater/${item.theater_id}`}>
          <SanitizedHTML html={item.theater_name} />
        </Link>
        <SanitizedHTML html={ `${item.city_name}, ${item.state_abbr}` } />
        <div className="dates">({moment.utc(item.start_date).format('M/D/YY')}&ndash;{moment.utc(item.end_date).format('M/D/YY')})</div>
      </div>
    )
  }
}
export default ShowItem;


