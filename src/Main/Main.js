import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Redirect } from "react-router";

import {  getSpecialties } from '../Specialties/actions';

import {  getStates } from './statesActions';

import {  updateTheaterID,
          updateTheater,
          alterTheater,
          addTheater } from '../Theater/actions';

import {  updateProds,
          editProd,
          newProd } from '../Productions/actions';

import {  getVenuesByTheater,
          getAllVenues,
          updateVenues } from '../Venues/actions';

import {  getAllShows,
          getAllArtists,
          newShow,
          newArtist,
          editShow } from '../Shows/actions';

import  { removeArtist } from '../Artists/actions';

import { GET_POST_HEADER, URL, process_submit } from '../constants/constants.js';

import Theater from "../Theater/theater";
import AddTheater from "../Theater/theaterAdd";
import Venues from "../Venues/venues";
import AddVenue from "../Venues/AddVenue/addvenue";
import AddShow from "../Shows/addshow";
import Productions from "../Productions/productions";
import AddProd from "../Productions/AddProduction/addproduction";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state={  current_id: this.props.Theater[0].id,
                  hide_production_form: true,
                  hide_add_venue_form: true,
                  hide_edit_venue_form: true,
                  hide_assoc_venue_form: true,
                  hide_new_show_form: true,
                  hide_new_theater_form: true,
                  hide_delete_theater_form: true,
                  venue: { venue_id : 0 },
                  newArtistID: null,
                  clear_edit: false,
                  delete_id: this.props.Theater[0].id
                };

    //console.log('params',this.props.match.params)
    if (this.props.match.params.id) this.update_theater_details(this.props.match.params.id);
    this.props.getStates();
    this.props.getSpecialties();
    this.props.getAllArtists();
    this.update_theater_details = this.update_theater_details.bind(this);
    this.handleIDSubmit = this.handleIDSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.alterTheaterCallback = this.alterTheaterCallback.bind(this);
    this.venue_form = this.venue_form.bind(this);
    this.update_venue = this.update_venue.bind(this);
    this.deleteVenueCallback = this.deleteVenueCallback.bind(this);
    this.addArtistCallback = this.addArtistCallback.bind(this);
    this.removeArtistCallback = this.removeArtistCallback.bind(this);
    this.add_show = this.add_show.bind(this);
    this.edit_show = this.edit_show.bind(this);
    this.edit_prod = this.edit_prod.bind(this);
    this.new_prod_cb = this.new_prod_cb.bind(this);
    this.show_form = this.show_form.bind(this);
    this.prod_form = this.prod_form.bind(this);
    this.theater_form = this.theater_form.bind(this);
    this.add_theater = this.add_theater.bind(this);
    this.delete_theater = this.delete_theater.bind(this);
  }

  componentDidUpdate(prevProps) {
    let tid = this.props.Theater[0].id;

    if (this.props.Theater[0].id !== prevProps.Theater[0].id){
      this.setState({ current_id: this.props.Theater[0].id, delete_id: this.props.Theater[0].id });
      this.update_theater_details(tid);
    }

    if (this.props.Prod && this.props.Prods.length !== prevProps.Prod.length) {
      this.update_theater_details(tid);
    }
    if (this.props.Shows !== prevProps.Shows ){
      this.props.updateProds(tid);
      this.setState({clear_edit: true});
    }
  }

  handleChange(e) {
    this.setState({ delete_id : e.target.value });
  }

  handleIDChange(e) {
    this.setState({ current_id : e.target.value });
    //this.props.updateTheaterID(e.target.value);
  }

  handleIDSubmit(e) {
    e.preventDefault();
    let tid = this.state.current_id;
    this.update_theater_details(tid);
  }

  alterTheaterCallback(newData) {
    this.props.alterTheater(newData);
  }

  addArtistCallback(newData) {
    this.props.newArtist(newData);
  }

  removeArtistCallback(newData) {
    this.props.removeArtist(newData);
  }

  update_theater_details(tid){
    this.setState({ hide_new_theater_form : true })
    //(tid.charAt(0)===':') ? tid=tid.substr(1) : tid=tid;
    this.props.updateTheater(tid);
    this.props.updateProds(tid);
    this.props.getVenuesByTheater(tid);
    this.props.getAllShows();
    this.props.getAllArtists();
    this.props.getAllVenues();
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
          d = v.find( item =>  (item.venue_id===id) ? item : null );
        }
        break;
    }

    this.setState(
      {
        hide_add_venue_form: (item==='hide_add_venue_form') ? !this.state.hide_add_venue_form : true,
        hide_edit_venue_form: (item==='hide_edit_venue_form') ? !this.state.hide_edit_venue_form : true,
        hide_assoc_venue_form: (item==='hide_assoc_venue_form') ? !this.state.hide_assoc_venue_form : true,
        venue: d,
        hide_new_show_form: true,
        hide_production_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: true
      }
    );
  }

  update_venue(body){
    body.tid=this.props.Theater[0].id;
    this.props.updateVenues(body);
    this.setState( {
        hide_new_show_form: true,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_production_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: true
      }
    );
  }

  deleteVenueCallback(id) {
    const body = { vid: id, venue_type: 4 };
    this.props.updateVenues(body);
  }

  show_form(){
    this.setState({
        hide_new_show_form: !this.state.hide_new_show_form,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_production_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: true
      }
    );
  }

  prod_form(){
    this.setState({
        hide_production_form: !this.state.hide_production_form,
        hide_new_show_form: true,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: true
      }
    );
  }

  new_prod_cb(body){
    this.props.newProd(body);
    this.setState( { hide_production_form : true } );
  }

  edit_show(body){
    this.props.editShow( body );
  }

  edit_prod(body){
    this.props.editProd( body );
  }

  theater_form(){
    this.setState(
      {
        hide_new_show_form: true,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_new_theater_form: !this.state.hide_new_theater_form,
        hide_delete_theater_form: true
      });
  }

  add_theater(body){
    this.setState(
      {
        hide_new_show_form: true,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: true
      });
      this.props.addTheater( body );
  }

  delete_theater_form(){
    this.setState(
      {
        hide_new_show_form: true,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: !this.state.hide_delete_theater_form
      });
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

  add_show(body){
    this.props.newShow( body );
    this.setState(
      {
        hide_new_show_form: true,
        hide_add_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_new_theater_form: true,
        hide_delete_theater_form: true
      }
    );
  }

  render() {
    console.log('PROPS',this.props)
    const d = this.props.Theater[0];
    const p = this.props.Prods;
    const v = (this.props.VenuesByTheater.venues) ? this.props.VenuesByTheater.venues : null;
    const s = (this.props.Shows.shows) ? this.props.Shows.shows : null;

    return (
      <div className="theaters">
        { (this.props.User.level===3)
          ? <form onSubmit={this.handleIDSubmit}>
              <label>
                <span className='runin'>Theater ID:</span>
                <input type="text" name="id" value={ this.state.current_id } onChange={this.handleIDChange} />
              </label>
              <input type="submit" value="Submit" className="subbutt" />
            </form>
          : null
        }

        { (this.props.User.level===3)
          ? (this.state.hide_delete_theater_form)
            ? null
            :<div className='overlay' style={{height: this.state.window + 'px'}}>
              <div class="add_show" style={{marginTop: this.state.scroll + 'px'}}>
                  <div class="close" onClick={() => { this.delete_theater_form() }} >&times;</div>
                  <h1>Delete Theater</h1>
                  <form onSubmit={this.delete_theater}>
                      <div>
                        <span className='runin'>Theater ID:</span>
                        <input id="delete_id" type="text" name="delete_id" value={ this.state.delete_id } onChange={this.handleChange} />
                      </div>
                      <input type="submit" value="Submit" className="subbutt" />
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

        { (d.id) ?
          <Theater
            cb={this.alterTheaterCallback}
            perm={ this.props.User.level }
            specialties={ this.props.Specialties.dropdown }
            theater={ this.props.Theater[0] }/>
          : null
        }

        { (v && v.length>0 && this.props.User.level>1)
          ? <Venues
                  id={ d.id }
                  perm={ this.props.User.level }
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
        { (this.state.hide_production_form)
          ? null
          : <AddProd
              theaterid={ d.id }
              artists={ this.props.Shows.artists }
              addShowCB={ this.add_show }
              newProdCB={ this.new_prod_cb }
              addArtistCB={ this.addArtistCallback }
              removeArtistCB={ this.removeArtistCallback }
              newArtist={ this.props.Shows.new_artist }
              prod_form={ this.prod_form }
            />
        }

        { (this.props.User.level > 1 )
          ?  <div className='toolbar'>
              <div className='head'>Tools</div>
              <div className="tool"
                   onClick={() => { this.venue_form('add') }}>Add Venue</div>
              <div className="tool"
                   onClick={() => { this.venue_form('associate') }}>Associate Venue</div>
              <div className="tool"
                   onClick={() => { this.show_form() }}>Add Show</div>
              <div className="tool"
                   onClick={() => { this.prod_form() }}>Add Production</div>
              { (this.props.User.level === 3) ? <div className="tool" onClick={() => { this.theater_form() }}>Add Theater</div> : null }
              { (this.props.User.level === 3) ? <div className="tool" onClick={() => { this.delete_theater_form() }}>Delete Theater</div> : null }
            </div>
          : null
        }

        { (p.length > 0)
          ? <div className='productions'><h2>Productions</h2>
              { p.map( ( item, index ) => {
                    return <Productions
                        idx={ index }
                        key={ `pr-${index}` }
                        prod={ item }
                        addShowCB={ this.add_show }
                        addArtistCB={ this.addArtistCallback }
                        removeArtistCB={ this.removeArtistCallback }
                        newArtist={ this.props.Shows.new_artist }
                        edit_show={ this.edit_show }
                        edit_prod={ this.edit_prod }
                        clear_edit={ this.state.clear_edit }
                        perm={ this.props.User.level }
                      />
                })
              }
            </div>
          : null
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
    updateTheater: theaterid => {
      dispatch( updateTheater(theaterid) )
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
    updateVenues: (body) => {
      dispatch( updateVenues(body) )
    },
    alterTheater: (data) => {
      dispatch( alterTheater(data) )
    },
    newShow: body => {
      dispatch( newShow( body ) )
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
    removeArtist: body => {
      dispatch( removeArtist(body) )
    },
    addTheater: body => {
      dispatch( addTheater(body) )
    },
    getSpecialties: body => {
      dispatch( getSpecialties() )
    }
  }
}

export default Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);