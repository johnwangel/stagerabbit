import React, {Component} from 'react';
import { connect } from 'react-redux';

class Venues extends Component {

  render() {
    let v = this.props.venues;
    return (
      <div className='venues'>
        <h2>Venues</h2>
        <ol>
          {
            v.map( (item, idx) => {
              return (<li key={idx} className='venue' id={item.venue_id}>
                        <span className='runin'>{item.venue_name}</span>
                        {(this.props.perm > 1) ? <span>({item.venue_id})</span> : null }
                        {(item.venue_add1) ? <div>{item.venue_add1}</div> : null }
                        {(item.venue_add2) ? <div>{item.venue_add2}</div> : null }
                        <div>{item.venue_city}, {item.venue_state} {item.venue_zip}</div>
                        { (this.props.perm > 1)
                          ? <div className="edit_tools inter">
                              <span className="list clickable"
                                    onClick={() => { this.props.edit('edit',item.venue_id) }}>Edit</span>
                              <span className="list clickable"
                                    onClick={() => { this.props.del(item.venue_id) }}>Delete</span>
                            </div>
                          : null
                        }

                      </li>)
            } )
          }
        </ol>

      </div>
    );
  }
}

export default Venues;



