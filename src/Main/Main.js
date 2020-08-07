import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";


import {  getSpecialties } from '../Specialties/actions';

import {  getStates } from './statesActions';

import {  updateTheaterID,
          updateTheater,
          alterTheater,
          addTheater,
          updateGeo } from '../Theater/actions';

import {  updateProds,
          editProd,
          newProd,
          removeArtistFromProd } from '../Productions/actions';

import {  getVenuesByTheater,
          getAllVenues,
          updateVenues } from '../Venues/actions';

import {  getAllShows,
          getAllArtists,
          newShow,
          newArtist,
          editShow,
          removeArtistFromShow } from '../Shows/actions';

import {  newEvent,
          editEvent,
          getEvents } from '../Events/actions';

import { getPosition } from '../constants/helpers';

import { GET_POST_HEADER, URL, process_submit } from '../constants/constants.js';

import Theater from "../Theater/theater";
import AddTheater from "../Theater/theaterAdd";
import Venues from "../Venues/venues";
import Event from "../Events/event";
import AddVenue from "../Venues/AddVenue/addvenue";
import AddShow from "../Shows/addshow";
import AddEvent from "../Events/addEvent";
import Productions from "../Productions/productions";
import AddProd from "../Productions/AddProduction/addproduction";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state={  current_id: this.props.match.params.id,
                  admin: (this.props.User && this.props.User.token && this.props.User.token===this.props.Theater[0].token) ? true : false,
                  hide_production_form: true,
                  hide_add_venue_form: true,
                  hide_edit_venue_form: true,
                  hide_assoc_venue_form: true,
                  hide_new_show_form: true,
                  hide_new_event_form: true,
                  hide_new_theater_form: true,
                  hide_delete_theater_form: true,
                  venue: { venue_id : 0 },
                  newArtistID: null,
                  clear_edit: false,
                  delete_id: this.props.Theater[0].id,
                  show_prods: 0,
                  show_events: 0,
                  scroll: null,
                  height: null
                };

    this.eventScroll = React.createRef();

    this.update_theater_details = this.update_theater_details.bind(this);
    this.handleIDSubmit = this.handleIDSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.alterTheaterCallback = this.alterTheaterCallback.bind(this);
    this.venue_form = this.venue_form.bind(this);
    this.update_venue = this.update_venue.bind(this);
    this.deleteVenueCallback = this.deleteVenueCallback.bind(this);
    this.addArtistCallback = this.addArtistCallback.bind(this);
    this.removeArtistFromProdCallback = this.removeArtistFromProdCallback.bind(this);
    this.removeArtistFromShowCallback = this.removeArtistFromShowCallback.bind(this);
    this.toggle_forms = this.toggle_forms.bind(this);
    this.add_show = this.add_show.bind(this);
    this.edit_show = this.edit_show.bind(this);
    this.edit_prod = this.edit_prod.bind(this);
    this.edit_event = this.edit_event.bind(this);
    this.new_prod_cb = this.new_prod_cb.bind(this);
    this.new_event_cb = this.new_event_cb.bind(this);
    this.show_form = this.show_form.bind(this);
    this.prod_form = this.prod_form.bind(this);
    this.event_form = this.event_form.bind(this);
    this.theater_form = this.theater_form.bind(this);
    this.add_theater = this.add_theater.bind(this);
    this.delete_theater = this.delete_theater.bind(this);
    this.toggleTime = this.toggleTime.bind(this);
    //this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) this.update_theater_details(this.props.match.params.id);
    if (this.props.match.params.from && this.props.match.params.from==='4'){
        this.eventScroll.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }
    this.update_theater_details(this.props.match.params.id);
    this.props.getStates();
    this.props.getSpecialties();
    this.props.getAllArtists();
    //window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    let tid = this.props.match.params.id;

    if (this.props.User.level !== prevProps.User.level && this.props.User.level>1){
      let admin=(this.props.User.token===this.props.Theater[0].token) ? true : false;
      this.setState({ admin } );
    }

    if (this.props.Theater[0].id !== prevProps.Theater[0].id){
      this.setState({ current_id: this.props.Theater[0].id, delete_id: this.props.Theater[0].id });
      this.update_theater_details(tid);
      let admin=(this.props.User.token===this.props.Theater[0].token) ? true : false;
      this.setState({ admin } );
    }

    if (this.props.Prods && this.props.Prods.upcoming && this.props.Prods.previous &&
           (this.props.Prods.upcoming.length !== prevProps.Prods.upcoming.length
            || this.props.Prods.previous.length !== prevProps.Prods.previous.length)
        ) {
      this.update_theater_details(tid);
    }

    if (this.props.Shows !== prevProps.Shows ){
      this.props.updateProds(tid);
      this.setState({clear_edit: true});
    }

    if (this.props.User !== prevProps.User && (this.props.User.token===this.props.Theater[0].token) ? true : false ){
      this.setState({admin:true});
    }

    if (prevProps.location.pathname !== this.props.location.pathname){
      this.setState( { current_id: this.props.match.params.id } );
      this.update_theater_details(this.props.match.params.id);
    }

  }

  //handleScroll(){ this.setState(getPosition()); }
  handleChange(e) { this.setState({ delete_id : e.target.value }); }
  handleIDChange(e) { this.setState({ current_id : e.target.value }); }
  alterTheaterCallback(newData) { this.props.alterTheater(newData); }
  addArtistCallback(newData) { this.props.newArtist(newData); }
  removeArtistFromProdCallback(newData) { this.props.removeArtistFromProd(newData); }
  removeArtistFromShowCallback(newData) { this.props.removeArtistFromShow(newData); }

  handleIDSubmit(e) {
    e.preventDefault();
    let tid = this.state.current_id;
    this.update_theater_details(tid);
  }

  update_theater_details(tid){
    this.setState({ hide_new_theater_form : true });
    let client;
    if (this.props && this.props.User && this.props.User.client) client=this.props.User.client;
    this.props.updateTheater(tid,client);
    this.props.updateProds(tid);
    this.props.getVenuesByTheater(tid);
    this.props.getAllShows();
    this.props.getAllArtists();
    this.props.getAllVenues();
    this.props.getEvents(tid);
  }

  venue_form(type,id){
    let v=null,d={ venue_id: 0 },item;
    switch (type){
      case 'add':
        item='hide_add_venue_form';
        break;
      case 'associate':
        item='hide_assoc_venue_form';
        break;
      case 'edit':
        item='hide_edit_venue_form';
        if (id){
          v = this.props.VenuesByTheater.venues;
          d = v.find( _item =>  (_item.venue_id===id) ? _item : null );
        }
        break;
    }
    this.toggle_forms(item,!this.state[item],d);
  }

  update_venue(body){
    body.tid=this.props.Theater[0].id;
    this.props.updateVenues(body);
    this.toggle_forms();
  }

  deleteVenueCallback(id) {
    const body = { vid: id, tid: this.state.current_id, venue_type: 4 };
    this.props.updateVenues(body);
  }

  toggle_forms(form_name,form_state,venue){
    this.setState({
        hide_production_form: (form_name && form_name==='hide_production_form') ? form_state : true,
        hide_new_show_form: (form_name && form_name==='hide_new_show_form') ? form_state : true,
        hide_add_venue_form: (form_name && form_name==='hide_add_venue_form') ? form_state : true,
        hide_new_event_form: (form_name && form_name==='hide_new_event_form') ? form_state : true,
        hide_edit_venue_form: (form_name && form_name==='hide_edit_venue_form') ? form_state : true,
        hide_assoc_venue_form: (form_name && form_name==='hide_assoc_venue_form') ? form_state : true,
        hide_new_theater_form: (form_name && form_name==='hide_new_theater_form') ? form_state : true,
        hide_delete_theater_form: (form_name && form_name==='hide_delete_theater_form') ? form_state : true,
        venue: (venue) ? venue : { venue_id : 0 }
      });
  }

  show_form(){ this.toggle_forms('hide_new_show_form',!this.state.hide_new_show_form); }
  prod_form(){ this.toggle_forms('hide_production_form',!this.state.hide_production_form); }
  event_form(){ this.toggle_forms('hide_new_event_form',!this.state.hide_new_event_form); }

  add_theater(body){
    this.toggle_forms();
    this.props.addTheater( body );
  }

  theater_form(){ this.toggle_forms('hide_new_theater_form',!this.state.hide_new_theater_form); }
  delete_theater_form(){ this.toggle_forms('hide_delete_theater_form',!this.state.hide_delete_theater_form); }

  add_show(body){
    this.props.newShow(body);
    this.toggle_forms();
  }

  new_prod_cb(body){
    this.props.newProd(body);
    this.toggle_forms();
  }

  new_event_cb(body){
    this.props.newEvent(body);
    this.toggle_forms();
  }

  edit_show(body) { this.props.editShow(body); }
  edit_prod(body) { this.props.editProd(body); }
  edit_event(body) { this.props.editEvent(body); }

  toggleTime(which,number){
    switch (which){
      case 1:
        this.setState({show_prods:number});
        break;
      case 2:
        this.setState({show_events:number});
        break;
    }

  }

  delete_theater(e){
    e.preventDefault();
    let body = process_submit(e.target.elements);
    GET_POST_HEADER.body = JSON.stringify(body)
    fetch(`${URL}theaters/delete_theater`, GET_POST_HEADER)
    .then(response => response.json())
    .then(data => this.props.history.push("/") )
    .catch( err => console.log(err.message));
  }

  handleGeo(e){
    e.preventDefault();
    let body = process_submit(e.target.elements);
    this.props.updateGeo(body);
  }

  render() {
    const d = this.props.Theater[0];
    const p = this.props.Prods;
    const v = (this.props.VenuesByTheater.venues) ? this.props.VenuesByTheater.venues : null;
    const s = (this.props.Shows.shows) ? this.props.Shows.shows : null;
    const e = this.props.Events.events;

    return (
      <div className="theaters">
        { (this.props.User.level===3)
          ? <div className="admin-theater main-column">
              <form onSubmit={this.handleIDSubmit}>
                <label>
                  <span className='runin'>Theater ID:</span>
                  <input  type="text"
                          name="id" value={ this.state.current_id }
                          onChange={this.handleIDChange} />
                </label>
                <input  type="submit"
                        value="Submit"
                        className="form-button" />
              </form>
              <form onSubmit={this.handleGeo.bind(this)}>
                <button id="geo"
                        type="submit"
                        value={ this.state.current_id }
                        className="form-button">Refresh Geo</button>
              </form>
            </div>
          : null
        }

        { (this.props.User.level===3)
          ? (this.state.hide_delete_theater_form)
            ? null
            :<div className='overlay' style={{height: this.state.height + 'px'}}>
              <div className="overlay-container" style={{marginTop: this.state.scroll + 'px'}}>
                  <div className="close" onClick={() => { this.delete_theater_form() }} >&times;</div>
                  <h2 className="form-title">Delete Theater</h2>
                  <form onSubmit={this.delete_theater}>
                      <div className="form-group">
                        <div className='label'>Theater ID:</div>
                        <input className="form-button" id="delete_id" type="text" name="delete_id" value={ this.state.delete_id } onChange={this.handleChange} />
                      </div>
                      <input type="submit" value="Submit" className="form-button" />
                  </form>
                </div>
              </div>
          : null
        }

        { (this.props.User.level===3)
          ? (this.state.hide_new_theater_form)
            ? null
            : <AddTheater
                states={ this.props.States.dropdown }
                theater_form={ this.theater_form }
                add_theater={ this.add_theater }/>
          : null
        }

        <h2 className={ (this.props.User.level===2) ? "main-page main-column adm" : "main-page main-column" }>Theater Company</h2>
        { (d.id) ?
          <Theater
            cb={this.alterTheaterCallback}
            perm={ (this.props.User.level===3 || this.state.admin ) ? true : false }
            perm_level={ this.props.User.level}
            specialties={ this.props.Specialties.dropdown }
            theater={ this.props.Theater[0] }/>
          : null
        }

        { (v && v.length>0)
          ? <h2 className={ (this.props.User.level===1)?"main-page main-column showlast": "main-page main-column" } >Venues</h2>
          : null
        }

        { (v && v.length>0)
          ? <Venues
              id={ d.id }
              order={(this.props.User.level===1)?1:0}
              perm={ (this.props.User.level===3 || this.state.admin ) ? true : false }
              venues={ this.props.VenuesByTheater.venues}
              edit={ this.venue_form }
              del={ this.deleteVenueCallback }
            />
          : null }

        { (this.state.hide_edit_venue_form)
          ? null
          : <AddVenue
                states={ this.props.States.dropdown }
                show_what={ this.state }
                update={ this.update_venue }
                venue_form={ this.venue_form }
            />
        }

        { (this.state.hide_add_venue_form)
          ? null
          : <AddVenue
                states={ this.props.States.dropdown }
                show_what={ this.state }
                update={ this.update_venue }
                venue_form={ this.venue_form }
            />
        }
        { (this.state.hide_assoc_venue_form)
          ? null
          : <AddVenue
                states={ this.props.States.dropdown }
                show_what={ this.state }
                update={ this.update_venue }
                venue_form={ this.venue_form }
            />
        }
        { (this.state.hide_new_show_form)
          ? null
          : <AddShow
              artists={ this.props.Shows.artists }
              addShowCB={ this.add_show }
              addArtistCB={ this.addArtistCallback }
              removeArtistCB={ this.removeArtistCallback }
              newArtist={ this.props.Shows.new_artist }
              show_form={ this.show_form }
            />
        }

        { (this.state.hide_new_event_form)
          ? null
          : <AddEvent
              theaterid={ d.id }
              addShowCB={ this.add_show }
              newEventCB={ this.new_event_cb }
              event_form={ this.event_form }
            />
        }

        { (this.state.hide_production_form)
          ? null
          : <AddProd
              theaterid={ d.id }
              artists={ this.props.Shows.artists }
              addShowCB={ this.add_show }
              newProdCB={ this.new_prod_cb }
              addArtistCB={ this.addArtistCallback }
              removeArtistProdCB={ this.removeArtistFromProdCallback }
              removeArtistShowCB={ this.removeArtistFromShowCallback }
              newArtist={ this.props.Shows.new_artist }
              prod_form={ this.prod_form }
            />
        }

        { (this.props.User.level === 3 || this.state.admin === true )
          ?  <div className='toolbar'>
              <div className='head'>Tools</div>
              <div className="tool"
                   onClick={() => { this.venue_form('associate') }}>Associate Venue</div>
              <div className="tool"
                   onClick={() => { this.venue_form('add') }}>Add Venue</div>
              <div className="tool"
                   onClick={() => { this.prod_form() }}>Add Production</div>
              <div className="tool"
                   onClick={() => { this.show_form() }}>Add Show</div>
              <div className="tool"
                   onClick={() => { this.event_form() }}>Add Web Event</div>
              { (this.props.User.level === 3) ? <div className="tool" onClick={() => { this.theater_form() }}>Add Theater</div> : null }
              { (this.props.User.level === 3) ? <div className="tool" onClick={() => { this.delete_theater_form() }}>Delete Theater</div> : null }
            </div>
          : null
        }

        <h2 className="main-page main-column">Productions</h2>
        <div className="toggle">
          <div  id="upcoming1"
                className={ (this.state.show_prods===0) ? "toggle-button active" : "toggle-button" }
                onClick={() => { this.toggleTime(1,0) } }>
              Upcoming
          </div>
          <div  id="previous1"
                className={ (this.state.show_prods===1) ? "toggle-button active" : "toggle-button" }
                onClick={() => { this.toggleTime(1,1) } }>
              Previous
          </div>
        </div>
        { (p.upcoming.length > 0)
          ? <div className={ (this.state.show_prods===0) ? 'productions main-column' : 'productions main-column hide' }>
              { p.upcoming.map( ( item, index ) => {
                return <Productions
                    idx={ index }
                    key={ `pr-${index}` }
                    prod={ item }
                    shows={ this.props.Shows }
                    addShowCB={ this.add_show }
                    addArtistCB={ this.addArtistCallback }
                    removeArtistShowCB={ this.removeArtistFromShowCallback }
                    removeArtistProdCB={ this.removeArtistFromProdCallback }
                    newArtist={ this.props.Shows.new_artist }
                    edit_show={ this.edit_show }
                    edit_prod={ this.edit_prod }
                    clear_edit={ this.state.clear_edit }
                    perm={ (this.props.User.level===3 || this.state.admin ) ? true : false }
                  />
                })
              }
            </div>
          : <div className={ (this.state.show_prods===0) ? 'productions main-column' : 'productions main-column hide' }><div className="empty">No upcoming productions listed.</div></div>
        }
        { (p.previous.length > 0)
          ? <div className={ (this.state.show_prods===1) ? 'productions main-column' : 'productions main-column hide' }>
              { p.previous.map( ( item, index ) => {
                return <Productions
                    idx={ index }
                    key={ `pr-${index}` }
                    prod={ item }
                    shows={ this.props.Shows }
                    addShowCB={ this.add_show }
                    addArtistCB={ this.addArtistCallback }
                    removeArtistShowCB={ this.removeArtistFromShowCallback }
                    removeArtistProdCB={ this.removeArtistFromProdCallback }
                    newArtist={ this.props.Shows.new_artist }
                    edit_show={ this.edit_show }
                    edit_prod={ this.edit_prod }
                    clear_edit={ this.state.clear_edit }
                    perm={ (this.props.User.level===3 || this.state.admin ) ? true : false }
                  />
                })
              }
            </div>
          : <div className={ (this.state.show_prods===1) ? 'productions main-column' : 'productions main-column hide' }><div className="empty">No previous productions available.</div></div>
        }

        <h2 className="main-page main-column" ref={this.eventScroll}>Events</h2>
        <div className="toggle">
          <div  id="upcoming2"
                className={ (this.state.show_events===0) ? "toggle-button active" : "toggle-button" }
                onClick={() => { this.toggleTime(2,0) } }>
              Upcoming
          </div>
          <div  id="previous2"
                className={ (this.state.show_events===1) ? "toggle-button active" : "toggle-button" }
                onClick={() => { this.toggleTime(2,1) } }>
              Previous
          </div>
        </div>
        { (e && e.upcoming && e.upcoming.length > 0)
          ? <div className={ (this.state.show_events===0) ? 'productions main-column' : 'productions main-column hide' }>
              { e.upcoming.map( ( item, index ) => {
                return <Event
                    idx={ index }
                    key={ `ev-${index}` }
                    event={ item }
                    shows={ this.props.Shows }
                    addShowCB={ this.add_show }
                    removeArtistShowCB={ this.removeArtistFromShowCallback }
                    removeArtistProdCB={ this.removeArtistFromProdCallback }
                    newArtist={ this.props.Shows.new_artist }
                    edit_event={ this.edit_event }
                    event_form={ this.event_form }
                    perm={ (this.props.User.level===3 || this.state.admin ) ? true : false }
                  />
                })
              }
            </div>
          : <div className={ (this.state.show_events===0) ? 'productions main-column' : 'productions main-column hide' }><div className="empty">No upcoming events listed.</div></div>
        }
        { (e && e.previous && e.previous.length > 0)
          ? <div className={ (this.state.show_events===1) ? 'productions main-column' : 'productions main-column hide' }>
              { e.previous.map( ( item, index ) => {
                return <Event
                    idx={ index }
                    key={ `ev-${index}` }
                    event={ item }
                    shows={ this.props.Shows }
                    addShowCB={ this.add_show }
                    addArtistCB={ this.addArtistCallback }
                    removeArtistShowCB={ this.removeArtistFromShowCallback }
                    newArtist={ this.props.Shows.new_artist }
                    edit_event={ this.edit_event }
                    event_form={ this.event_form }
                    perm={ (this.props.User.level===3 || this.state.admin ) ? true : false }
                  />
                })
              }
            </div>
          : <div className={ (this.state.show_events===1) ? 'productions main-column' : 'productions main-column hide' }><div className="empty">No previous events available.</div></div>
        }
       </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    updateTheaterID: theaterid => {
      dispatch( updateTheaterID(theaterid) )
    },
    updateTheater: (theaterid,client) => {
      dispatch( updateTheater(theaterid,client) )
    },
    getStates : () => {
      dispatch( getStates() )
    },
    updateProds : theaterId => {
      dispatch( updateProds(theaterId) )
    },
    newProd: body => {
      dispatch( newProd( body ) )
    },
    getVenuesByTheater: theaterId => {
      dispatch( getVenuesByTheater(theaterId) )
    },
    getAllShows: () => {
      dispatch( getAllShows() )
    },
    getAllArtists: () => {
      dispatch( getAllArtists() )
    },
    getAllVenues: () => {
      dispatch( getAllVenues() )
    },
    getEvents: (tid) => {
      dispatch( getEvents(tid) )
    },
    updateVenues: (body) => {
      dispatch( updateVenues(body) )
    },
    alterTheater: (data) => {
      dispatch( alterTheater(data) )
    },
    newShow: body => {
      dispatch( newShow( body ) )
    },
    newEvent: body => {
      dispatch( newEvent( body ) )
    },
    newArtist: body => {
      dispatch( newArtist( body ) )
    },
    editShow: body => {
      dispatch( editShow(body) )
    },
    editProd: body => {
      dispatch( editProd(body) )
    },
    editEvent: body => {
      dispatch( editEvent(body) )
    },
    removeArtistFromProd: body => {
      dispatch( removeArtistFromProd(body) )
    },
    removeArtistFromShow: body => {
      dispatch( removeArtistFromShow(body) )
    },
    addTheater: body => {
      dispatch( addTheater(body) )
    },
    getSpecialties: body => {
      dispatch( getSpecialties() )
    },
    updateGeo: body => {
      dispatch( updateGeo(body) )
    }
  }
}

export default Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);