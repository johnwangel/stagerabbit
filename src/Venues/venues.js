import React, {Component} from 'react';
import { connect } from 'react-redux';

class Venues extends Component {

  render() {
    let v = this.props.venues;
    return (
      <div className={ (this.props.order===1)?"venues main-column showlast": "venues main-column" }>
          {
            v.map( (item, idx) => {
              return (<div key={idx} className='venue' id={item.venue_id}>
                        <div className='number'>{idx+1}</div>
                        <div className='venue-info'>
                          <span className='runin'>{item.venue_name}</span>
                          {(item.venue_add1) ? <div>{item.venue_add1}</div> : null }
                          {(item.venue_add2) ? <div>{item.venue_add2}</div> : null }
                          <div>{item.venue_city}, {item.venue_state} {item.venue_zip}</div>
                        </div>
                        { (this.props.perm > 1)
                          ?   <div className="form-button-2"
                                    onClick={() => { this.props.edit('edit',item.venue_id) }}>
                                Edit</div>
                          :null
                        }
                        { (this.props.perm > 1)
                            ?  <div className="form-button-2"
                                    onClick={() => { this.props.del(item.venue_id) }}>
                                  Remove</div>
                          : null
                        }
                      </div>)
            } )
          }
      </div>
    );
  }
}

export default Venues;



