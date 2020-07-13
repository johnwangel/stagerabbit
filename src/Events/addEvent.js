import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import parseISO from 'date-fns/parseISO'

import { process_submit } from '../constants/constants';
import { getPosition } from '../constants/helpers';
import { getEventTypes } from './actions';

import { newShow } from '../Shows/actions';

import AddArtist from "../Productions/AddProduction/addArtist";

var Moment = require('moment');

const timezones = ['EST','EDT','CST','CDT','MST','MDT','PST','PDT','AKST','AKDT','HST'];
const hours = [1,2,3,4,5,6,7,8,9,10,11,12];
const minutes = ['00','15','30','45'];
const period = ['am','pm'];

class AddEvent extends Component {
  constructor(props) {
    super(props);

    const errRef=createRef();
    const errRef2=createRef();

    var s = (this.props.specs) ? this.props.specs : null;
    var t = (s && s.time) ? s.time : null;
    var e = (this.props.event) ? this.props.event : null;

    this.state = {
      eid: (e && e.event_id) ? e.event_id : null,
      editmode: (s) ? true : false,
      formTitle: (s) ? 'Update Web Event' : 'Add Web Event',
      title: (e && e.title) ? e.title : '',
      free: (e && e.is_free) ? e.is_free : false,
      website: (e && e.website) ? e.website : null,
      more_info: (e && e.more_info) ? e.more_info : null,
      event_type: (e && e.event_type_id) ? e.event_type_id.toString() : '0',
      start : (e && e.date_start)
        ? parseISO(Moment.utc(e.date_start).format('YYYY-MM-DD'))
        : parseISO(Moment.utc(new Date()).format('YYYY-MM-DD')),
      end: (e && e.date_end)
        ? parseISO(Moment.utc(e.date_end).format('YYYY-MM-DD'))
        : null,
      show_error: false,
      show_title: '',
      height: null,
      scroll: null,
      show_id: (e && e.show_id) ? e.show_id : 0,
      input_show: false,
      new_show_error: null,
      onetime: (e && e.no_repeat) ? e.no_repeat : false,
      hour: (t)?t.hour:'0',
      minutes: (t)?t.minutes:'0',
      period: (t)?t.period:'0',
      timezone: (t)?t.zone:'0',
      description: (e && e.description) ? e.description: '',
      title_error: false,
      type_error: false,
      desc_error: false,
      website_error: false
    };

    this.props.getEventTypes();
    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.inputshow = this.inputshow.bind(this);
    this.submitshow = this.submitshow.bind(this);
    this.createList = this.createList.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.Shows &&
        this.props.Shows.new_show &&
        this.props.Shows.new_show !== prevProps.Shows.new_show ){
      this.setState( { show_id: `${ this.props.Shows.new_show.id }` } );
    }
  }

  componentDidMount() {
    this.setState(getPosition());
  }

  handleNew(e) {
    this.setState({ [e.target.id] : this.state[e.target.id]+1 });
  }

  handleSubmit(e) {
    e.preventDefault();
    if ( this.state.title==='' ) this.setState( { title_error : true } );
    if ( this.state.type==='0' ) this.setState( { type_error : true } );
    if ( this.state.description==='' ) this.setState( { desc_error : true } );
    if ( this.state.website==='' ) this.setState( { website_error : true } );

    if ( this.state.title_error || this.state.type_error || this.state.desc_error || this.state.website_error ) {
      this.errRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    let body = process_submit(e.target.elements);
    if (body.hour_1 && body.minutes_1 && body.period_1 && body.zone_1) {
      body.time=`${body.hour_1}:${body.minutes_1} ${body.period_1} ${body.zone_1}`;
    }

    body.free=this.state.free;
    body.onetime=this.state.onetime;

    for (const i in body){
      if (body[i]==='Submit Event') body.theater_id=i;
    }

    if (this.state.editmode) {
      body.event_id=this.state.eid;
      this.props.edit_event(body);
      this.props.event_form();
    } else {
      this.props.newEventCB(body);
    }
  }

  createList(array,type){
    let list=[];
    list.push(<option key={`${type}-0`} value="0">{`${type}`}</option>)
    array.forEach( (item,index) => list.push(<option key={index} value={`${item}`}>{item}</option>) );
    return list;
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleStartDateChange( date ) {
    this.setState({ start : date, end: date } );
  }

  handleEndDateChange( date ) {
    this.setState({ end : date } );
  }

  inputshow() {
    this.setState({ input_show : !this.state.input_show } );
  }

  submitshow(){
    var new_show_error='';
    if (this.state.show_title==='') new_show_error+='<li>You must provide a title.</li>';
    if (this.state.genre==='0') new_show_error+='<li>You must provide a genre.</li>';
    if ( new_show_error !== '' ){
      new_show_error='<h4>Errors</h4><ol>'+new_show_error+'</ol>';
      this.setState({ new_show_error });
      // this.errRef2.current.scrollIntoView({
      //     behavior: 'smooth',
      //     block: 'start'
      //   });
      return;
    }
    this.props.newShow({ show_title_1: this.state.show_title, genre_1: this.state.genre  });
    this.setState( { input_show: !this.state.input_show } );
  }

  handleCheck(loc){
    switch(loc){
      case 'free':
        this.setState({free: !this.state.free });
        break;
      case 'onetime':
        this.setState({onetime: !this.state.onetime });
        break;
    }

  }

  onDropdownSelected( e ) {
    this.setState({ [e.target.name] : e.target.value } );
  }

  render() {
    let e=(this.props.event) ? this.props.event : null;
    return (
      <div ref={ this.errRef } className='overlay'>
        <div className="overlay-container">
          <div className="close" onClick={() => { this.props.event_form() }} >&times;</div>
          <h2 className="form-title">{this.state.formTitle}</h2>
          <form id="form-1" onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <div className="label">Event Title (required):</div>
              { (this.state.title_error)
                ? <div className='error'>You must include a title for the event.</div>
                : null
              }
              <input
                key="event-title-1"
                id="event_title_1"
                type="text"
                name="title"
                placeholder='Web Event Title'
                value={ this.state.title }
                onChange={this.handleChange}
                required />
            </div>

            <div className='form-group'>
              <div className="label">Event Type (required):</div>
              { (this.state.type_error)
                ? <div className='error'>You must select an event type.</div>
                : null
              }
              <select
                    className="form-select wide"
                    id="eventtype_1"
                    key="eventtype_1"
                    type="select"
                    name="event_type"
                    value={this.state.event_type}
                    onChange={this.onDropdownSelected}
                    required >
                  {this.props.Events.types}
              </select>
          </div>

          <div className="free">
              <div className="optin" onClick={ () => { this.handleCheck('free') } } >
                <input  type="checkbox"
                        id="free"
                        name="free"
                        defaultChecked={ this.state.free }
                />
                <span className="custom-checkbox"></span>
                <div className="label">Check if event is Free</div>
              </div>
          </div>

            <div className='form-group'>
              <div className="label">Direct Link to Event (optional):</div>
              { (this.state.website_error)
                ? <div className='error'>You must include a link to the event.</div>
                : null
              }
              <input
                key="event_link_1"
                id="event_link_1"
                type="text"
                name="website"
                placeholder='Event URL'
                value={ this.state.website }
                onChange={this.handleChange}
                required />
            </div>

            <div className='form-group'>
              <div className="label">Link to Event Info Page (optional):</div>
              <input
                key="event_info_link_1"
                id="event_info_link_1"
                type="text"
                name="event_info_link"
                placeholder='More Info URL'
                value={this.state.more_info}
                onChange={this.handleChange} />
            </div>

            <div className='form-group' ref={ this.errRef2 }>
              <div className="label">Show Title (optional):</div>
              { (this.state.show_error)
                ? <div className='error'>You must select a show.</div>
                : null
              }

              { (this.state.input_show)
                ? <div className='form-group subform'>
                        { (this.state.new_show_error)
                            ? <div className='error'>{ this.state.new_show_error }</div>
                            : null
                        }
                        <input
                          key="show-title-1"
                          id="show_title_1"
                          type="text"
                          name="show_title"
                          placeholder='Show Title'
                          value={this.state.show_title }
                          onChange={this.handleChange}
                          required />
                        <div className="label">Genre:</div>
                        <select
                              className="form-select wide"
                              id="genre_1"
                              key="genre-1"
                              type="select"
                              name="genre"
                              value={this.state.genre_1}
                              onChange={this.onDropdownSelected}
                              required >
                          <option key="genre-0" value="0">Select one...</option>
                          <option key="genre-1" value="2">musical, comedy</option>
                          <option key="genre-2" value="3">musical, drama</option>
                          <option key="genre-3" value="4">musical, revue</option>
                          <option key="genre-4" value="5">play, comedy</option>
                          <option key="genre-5" value="6">play, drama</option>
                        </select>
                        <div className='edit_buttons'>
                          <span className="form-button-2"
                                onClick={() => { this.inputshow() }}>
                            Back to Select
                          </span>
                          <span className="form-button-2"
                                onClick={() => { this.submitshow() }}>
                            Submit Show
                          </span>
                        </div>
                  </div>
                : <div>
                    <select
                          className="form-select wide"
                          id="show_select"
                          type="select"
                          name="show_id"
                          value={this.state.show_id}
                          onChange={this.onDropdownSelected}>
                      {this.props.Shows.shows}
                    </select>
                    <div className='edit_buttons'>
                      <span className="form-button-2"
                            onClick={() => { this.inputshow() }}>
                        Create a New Show
                      </span>
                    </div>
                  </div>
              }
            </div>

          <div className='form-group datetime'>
            <div className="label">Start Date (required):</div>
            <div className='date-info'>
              <DatePicker
                id="start_date_1"
                name="start_date"
                selected={this.state.start}
                onChange={this.handleStartDateChange}
              />

              <div className="optin" onClick={ () => { this.handleCheck('onetime') } } >
                <input  type="checkbox"
                        id="onetime"
                        name="onetime"
                        defaultChecked={ this.state.onetime } />
                <span className="custom-checkbox"></span>
                <div className="label">One-time event</div>
              </div>
            </div>
          </div>

          <div className='form-group datetime'>
            <div className="label">Start Time (optional):</div>

            <div className="time">
              <select
                    className="form-select wide"
                    id="hour_1"
                    key="hour_1"
                    type="select"
                    name="hour"
                    value={this.state.hour}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(hours,'HOUR')}
              </select>
              <select
                    className="form-select wide"
                    id="minutes_1"
                    key="minutes_1"
                    type="select"
                    name="minutes"
                    value={this.state.minutes}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(minutes,'MINUTES')}
              </select>
              <select
                    className="form-select wide"
                    id="period_1"
                    key="period_1"
                    type="select"
                    name="period"
                    value={this.state.period}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(period,'PERIOD')}
              </select>
              <select
                    className="form-select wide"
                    id="zone_1"
                    key="zone_1"
                    type="select"
                    name="timezone"
                    value={this.state.timezone}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(timezones,'TIMEZONE')}
              </select>
            </div>
          </div>

            <div className='form-group'>
              <div className="label">End Date (optional):</div>
              <DatePicker
                id="end_date_1"
                name="end_date"
                selected={this.state.end}
                onChange={this.handleEndDateChange}
              />
            </div>

            <div className='form-group'>
              <h4 className="form-title expand">
                  Description (required):
              </h4>
              { (this.state.desc_error)
                ? <div className='error'>You must include a description of the event.</div>
                : null
              }
              <div id="desc-display" className="add_artist show">
                <textarea
                      id="description_1"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange} />
              </div>
            </div>

            <input
                className='form-button'
                id={ this.props.theaterid }
                type="submit"
                value="Submit Event"/>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    getEventTypes: () => {
      dispatch( getEventTypes() )
    },
    newShow: body => {
      dispatch( newShow(body) )
    }
  }
}

AddEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);

export default AddEvent;