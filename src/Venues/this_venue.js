import React, {Component} from 'react';
import { connect } from 'react-redux';

class This_Venue extends Component {

  render() {
    const v = this.props.ven;
    return (
      <tr className="venue" id={v.id} >
        <td className="label">Location:</td>
        <td>
          { v.venue_name}
          { (v.venue_add1) ? <div className='addr'>{ v.venue_add1 }</div> : null }
          { (v.venue_add2) ? <div className='addr'>{ v.venue_add2 }</div> : null }
          { (v.venue_city || v.venue_state || v.venue_zip )
            ? <div  className='addr'>
                { (v.venue_city) ? <span>{ v.venue_city }</span> : null }
                { (v.venue_state) ? <span>, { v.venue_state }</span> : null }
                { (v.venue_zip) ? <span> { v.venue_zip }</span> : null }
              </div>
            : null
          }
        </td>
      </tr>
    )
  }
}

export default This_Venue;