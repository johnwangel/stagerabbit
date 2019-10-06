import React, {Component} from 'react';
import { connect } from 'react-redux';

class Venues extends Component {

  render() {
    let v = this.props.venues;
    return (
      <div>
        <h2>Venues</h2>
        <ol>
          {
            v.map( (item, idx) => {
              return (<li key={idx} className='venue' id={item.venue_id}>
                        <span className='runin'>{item.venue_name}:</span> |{item.venue_id}| {item.venue_add1}, {item.venue_add2}, {item.venue_city}, {item.venue_state}: {item.venue_zip}
                        <span className="list clickable" onClick={() => { this.props.edit(item.venue_id) }}>Edit</span>
                        <span className="list clickable" onClick={() => { this.props.del(item.venue_id) }}>Delete</span>
                      </li>)
            } )
          }
        </ol>

      </div>
    );
  }
}

export default Venues;



