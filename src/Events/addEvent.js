import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import TimezonePicker from 'react-bootstrap-timezone-picker';

import parseISO from 'date-fns/parseISO'

import { process_submit } from '../constants/constants';
import { getPosition } from '../constants/helpers';
import { getEventTypes } from './actions';

import { newShow } from '../Shows/actions';

import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import "react-datepicker/dist/react-datepicker.css";

import AddArtist from "../Productions/AddProduction/addArtist";

var Moment = require('moment-timezone');

const timezones = {
  'Eastern Standard Time [-05:00]': 'EST',
  'Eastern Daylight Time [-04:00]': 'EDT',
  'Central Standard Time [-06:00]': 'CST',
  'Central Daylight Time [-05:00]': 'CDT',
  'Mountain Standard Time [-07:00]': 'MST',
  'Mountain Daylight Time [-06:00]': 'MDT',
  'Pacific Standard Time [-08:00]': 'PST',
  'Pacific Daylight Time [-07:00]': 'PDT',
  'Alaska Standard Time [-09:00]': 'AKST',
  'Alaska Daylight Time [-08:00]': 'AKDT',
  'Hawaii Standard Time [-10:00]': 'HST'
}

const hours = [1,2,3,4,5,6,7,8,9,10,11,12];
const minutes = ['00','15','30','45'];
const day = ['am','pm'];

class AddEvent extends Component {
  constructor(props) {
    super(props);

    const errRef=createRef();
    const errRef2=createRef();

    var s = (this.props.specs) ? this.props.spec : null;
    var e = (this.props.event) ? this.props.event : null;


    this.state = {
      eid: (e && e.event_id) ? e.event_id : null,
      editmode: (s) ? true : false,
      formTitle: (s) ? 'Update Web Evemt' : 'Add Web Event',
      start : (e && e.date_start)
        ? parseISO(Moment.utc(e.date_start).format('YYYY-MM-DD'))
        : parseISO(Moment.utc(new Date()).format('YYYY-MM-DD')),
      end: (e && e.date_end)
        ? parseISO(Moment.utc(e.date_end).format('YYYY-MM-DD'))
        : null,
      show_error: false,
      height: null,
      scroll: null,
      input_show: false,
      new_show_error: null,
      onetime: (e && e.no_repeat) ? e.no_repeat : false,
      free: (e && e.is_free) ? e.is_free : false,
      time: null,
      timezone: null
    };

    this.props.getEventTypes();

    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.scrollToMyRef = this.scrollToMyRef.bind(this);
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
    if ( this.state.venue_id==='0' ) this.setState( { venue_error : true } );
    if ( this.state.show_id==='0' ) this.setState( { show_error : true } );
    if ( this.state.venue_error || this.state.show_error ) {
      this.errRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    let body = process_submit(e.target.elements);
    if (this.state.time) {
      let zone='EST';
      if (this.state.timezone) {
        zone=this.state.timezone;
      }
      body.time = `${this.state.time} ${zone}`
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

  scrollToMyRef(){
   window.scrollTo(0, this.errRef.offsetTop);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleStartDateChange( date ) {
    this.setState({ start : date, end: date } );
  }

  handleTimeChange( time ){
    this.setState({ time : time });
  }

  handleTimezoneChange( timezone ){
    this.setState({ timezone : timezone });
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
      this.errorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
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

  handleExpand(id){
    switch (id){
      case 1:
        this.setState({ expand_desc: !this.state.expand_desc });
        break;
      case 2:
        this.setState({ expand_cast: !this.state.expand_cast });
        break;
      case 3:
        this.setState({ expand_dir: !this.state.expand_dir });
        break;
      case 4:
        this.setState({ expand_chor: !this.state.expand_chor });
        break;
      case 5:
        this.setState({ expand_md: !this.state.expand_md });
        break;
      default:
        return;
    }
  }

  onDropdownSelected( e ) {
    this.setState({ [e.target.name] : e.target.value } );
  }

  render() {
    let e=(this.props.event) ? this.props.event : null;
    console.log('props in add event',e);

    return (
      <div ref={ this.errRef } className='overlay'>
        <div className="overlay-container">
          <div className="close" onClick={() => { this.props.event_form() }} >&times;</div>
          <h2 className="form-title">{this.state.formTitle}</h2>
          <form id="form-1" onSubmit={this.handleSubmit}>

            <div className='form-group'>
              <div className="label">Event Title (required):</div>
              <input
                key="event-title-1"
                id="event_title_1"
                type="text"
                name="event_title"
                placeholder='Web Event Title'
                value={(e && e.title)? e.title : null}
                onChange={this.handleChange}
                required />
            </div>

            <div className='form-group'>
              <div className="label">Event Type (required):</div>
              <select
                    className="form-select wide"
                    id="eventtype_1"
                    key="eventtype_1"
                    type="select"
                    name="eventtype"
                    value={(e && e.event_type_id) ? e.event_type_id : 0 }
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
                        defaultChecked={ this.state.is_free }
                />
                <span className="custom-checkbox"></span>
                <div className="label">Check if event is Free</div>
              </div>
          </div>

            <div className='form-group'>
              <div className="label">Direct Link to Event (optional):</div>
              <input
                key="event_link_1"
                id="event_link_1"
                type="text"
                name="event_link"
                placeholder='Event URL'
                value={ (e && e.website ) ? e.website : null }
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
                value={(e && e.more_info) ? e.more_info : null }
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
                          value={(e && e.show_id) ? `${e.show_id}` : '0'}
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
                    value={(this.props.specs && this.props.specs.time)?this.props.specs.time.hour:0}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(hours,'Hour')}
              </select>
              <select
                    className="form-select wide"
                    id="minutes_1"
                    key="minutes_1"
                    type="select"
                    name="minutes"
                    value={(this.props.specs && this.props.specs.time)?this.props.specs.minute:0}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(minutes,'Minutes')}
              </select>
              <select
                    className="form-select wide"
                    id="period_1"
                    key="period_1"
                    type="select"
                    name="period"
                    value={(this.props.specs && this.props.specs.time)?this.props.specs.time.day:0}
                    onChange={this.onDropdownSelected}
                    required >
                  { this.createList(day,'Period')}
              </select>

              <TimezonePicker
                absolute      = {false}
                defaultValue  = "Eastern Standard Time [-05:00]"
                placeholder   = "Select timezone..."
                timezones     = { timezones }
                onChange      = { this.handleTimezoneChange }
              />
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
              <div id="desc-display" className="add_artist show">
                <textarea
                      id="description_1"
                      name="description"
                      value={(e && e.description)?e.description:null}
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