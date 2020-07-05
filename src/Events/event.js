import React, {Component} from 'react';
import { connect } from 'react-redux';

import SanitizedHTML from 'react-sanitized-html';

import Artists from "../Artists/artists";
import Venue from "../Venues/this_venue";
import AddShow from "../Shows/addshow";
import AddEvent from "./addEvent";

const moment = require('moment');

class Event extends Component {
  constructor(props) {
    super(props);

    let _time = null;
    if (this.props.event.time_start) {
      let time=this.props.event.time_start;
      let timeonly=time.split(' ')[0];
      let zone=time.split(' ')[1];
      let hour=parseInt(timeonly.split(':')[0]);
      let minute=parseInt(timeonly.split(':')[1]);
      let day='am'
      if (hour > 12){
        day='pm';
        hour=hour-12;
      }
      let new_time= {
        hour: hour,
        minute: minute,
        day: day,
        zone: zone,
        full: `${hour}:${minute} ${day} ${zone}`
      };
      _time = new_time;
    }

    this.state = { edit_event: false, time: _time };
    this.event_form = this.event_form.bind(this);
    this.create_URL = this.create_URL.bind(this);
  }

  event_form(){
    this.setState({ edit_event: !this.state.edit_event });
  }

  create_URL(url){
    let plain=url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/,'');
    let link=`https://${plain}`;
    return ( <div><a href={link} target='_blank' className='website'>{plain}</a></div>)
  }

  render() {
    let e = this.props.event;

    return ( <div key={e.event_id+'-event'}
                  id={e.event_id}
                  className="production">

                <div className="show_title"><SanitizedHTML html={ e.title } /></div>

                <table className="details-table"><tbody>
                  <tr><td>Event Type:</td><td>{e.event_type}</td></tr>
                  <tr><td>Description:</td><td>{ e.description }</td></tr>
                  <tr><td>Event URL:</td><td>{ this.create_URL(e.website) }</td></tr>
                  <tr><td>Cost:</td><td>{ (e.is_free) ? 'FREE' : '$' }</td></tr>
                  <tr><td>{ (e.no_repeat) ? 'Date:' : 'Start Date:'}</td><td>{moment.utc(e.date_start).format('MMMM D, YYYY')}</td></tr>
                  { (!e.no_repeat)
                    ? <tr><td>End Date:</td><td>{moment.utc(e.date_end).format('MMMM D, YYYY')}</td></tr>
                    : null
                  }
                  { (this.state.time)
                    ? <tr><td>Start Time:</td><td>{ this.state.time.full }</td></tr>
                    : null
                  }
                  { (e.more_info)
                    ? <tr><td>For more information:</td><td>{ this.create_URL(e.more_info) }</td></tr>
                    : null
                  }
                </tbody></table>


                { (this.props.perm)
                  ? <div className='edit-prod-buttons'>
                        { (!this.state.edit_event)
                           ? <span className="form-button-3"
                                   onClick={() => { this.event_form() }}>
                                Update Event
                              </span>
                           : <AddEvent
                              theaterid={ e.theater_id }
                              event={ this.props.event }
                              specs={ this.state }
                              edit_event={ this.props.edit_event }
                              event_form={ this.event_form }
                            />
                        }
                    </div>
                  : null
                }
              </div>
            )
  }
}

export default Event;