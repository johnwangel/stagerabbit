import React, {Component} from 'react';
import { connect } from 'react-redux';

import SanitizedHTML from 'react-sanitized-html';

import Artists from "../Artists/artists";
import Venue from "../Venues/this_venue";
import AddShow from "../Shows/addshow";
import AddEvent from "./addEvent";

const moment = require('moment');

const set_time = (time) => {
    let timeonly=time.split(' ')[0];
    let period=time.split(' ')[1];
    let zone=time.split(' ')[2];
    let hour=timeonly.split(':')[0];
    let minutes=timeonly.split(':')[1];
    let new_time= {
      hour: hour,
      minutes: minutes,
      period: period,
      zone: zone,
      full: `${hour}:${minutes} ${period} ${zone}`
    };
    return new_time;
}

class Event extends Component {
  constructor(props) {
    super(props);
    this.event_form = this.event_form.bind(this);
    this.create_URL = this.create_URL.bind(this);
    let time = (this.props.event.time_start) ? set_time(this.props.event.time_start) : null;
    this.state = {  edit_event: false, time };
  }

  componentDidUpdate(prevProps) {
    if (this.props.event &&
        this.props.event.time_start &&
        this.props.event.time_start !== prevProps.event.time_start ){
      this.setState( { time: set_time(this.props.event.time_start) } );
    }
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
                  { (e.show_title)
                    ? <tr><td>Production:</td><td>{e.show_title}</td></tr>
                    : null
                  }
                  { (e.genre_name)
                    ? <tr><td>Genre:</td><td>{e.genre_name}</td></tr>
                    : null
                  }
                  <tr><td>Description:</td><td><SanitizedHTML html={ e.description } /></td></tr>
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