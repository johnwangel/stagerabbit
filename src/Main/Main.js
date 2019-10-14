import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  getStates } from './statesActions';

import {  updateTheaterID,
          updateTheater,
          alterTheater } from '../Theater/actions';

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

import Theater from "../Theater/theater";
import Venues from "../Venues/venues";
import AddVenue from "../Venues/AddVenue/addvenue";
import AddShow from "../Shows/addshow";
import Productions from "../Productions/productions";
import AddProd from "../Productions/AddProduction/addproduction";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state={  hide_production_form: true,
                  hide_venue_form: true,
                  hide_edit_venue_form: true,
                  hide_assoc_venue_form: true,
                  hide_new_show_form: true,
                  venue: { venue_id : 0 },
                  newArtistID: null,
                  clear_edit: false
                };
    if (this.props.match.params.id) this.update_theater_details(this.props.match.params.id);
    this.props.getStates();
    this.props.getAllArtists();
    this.update_theater_details = this.update_theater_details.bind(this);
    this.handleIDSubmit = this.handleIDSubmit.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.alterTheaterCallback = this.alterTheaterCallback.bind(this);
    this.blank_venue_form = this.blank_venue_form.bind(this);
    this.assoc_venue_form = this.assoc_venue_form.bind(this);
    this.edit_venue_form = this.edit_venue_form.bind(this);
    this.update_venue = this.update_venue.bind(this);
    this.deleteVenueCallback = this.deleteVenueCallback.bind(this);
    this.addArtistCallback = this.addArtistCallback.bind(this);
    this.removeArtistCallback = this.removeArtistCallback.bind(this);
    this.add_show = this.add_show.bind(this);
    this.edit_show = this.edit_show.bind(this);
    this.edit_prod = this.edit_prod.bind(this);
    this.new_prod_cb = this.new_prod_cb.bind(this);
  }

  componentDidUpdate(prevProps) {
    let tid = this.props.Theater[0].id;
    if (this.props.Prod && this.props.Prods.length !== prevProps.Prod.length) {
      this.update_theater_details(tid);
    }
    if (this.props.Shows !== prevProps.Shows ){
      this.props.updateProds(tid);
      this.setState({clear_edit: true})
    }
  }

  handleIDChange(e) {
    this.props.updateTheaterID(e.target.value)
  }

  handleIDSubmit(e) {
    e.preventDefault();
    let tid = this.props.Theater[0].currId;
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
    (tid.charAt(0)===':') ? tid=tid.substr(1) : tid=tid;
    this.props.updateTheater(tid);
    this.props.updateProds(tid);
    this.props.getVenuesByTheater(tid);
    this.props.getAllShows();
    this.props.getAllArtists();
    this.props.getAllVenues();
  }

  blank_venue_form(){
    this.setState(
      {
        hide_new_show_form: true,
        hide_venue_form: false,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_production_form: true
      }
    );
  }

  edit_venue_form(id) {
    const v = this.props.VenuesByTheater.venues;
    const d = v.find( item =>  (item.venue_id===id) ? item : null )
    this.setState({
        hide_new_show_form: true,
        hide_venue_form: true,
        hide_edit_venue_form: false,
        venue: d,
        hide_assoc_venue_form: true,
        hide_production_form: true
      }
    );
  }

  deleteVenueCallback(id) {
    const body = { vid: id, venue_type: 4 };
    this.props.updateVenues(body);
  }

  assoc_venue_form(){
    this.setState( {
        hide_new_show_form: true,
        hide_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: false,
        hide_production_form: true
      }
    );
  }

  update_venue(body){
    body.tid=this.props.Theater[0].id;
    this.props.updateVenues(body);
    this.setState( {
        hide_new_show_form: true,
        hide_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_production_form: true
      }
    );
  }

  add_show_form(){
    this.setState({
        hide_new_show_form: false,
        hide_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_production_form: true
      }
    );
  }

  add_prod_form(){
    this.setState({
        hide_new_show_form: true,
        hide_venue_form: true,
        hide_edit_venue_form: true,
        venue: {venue_id: 0},
        hide_assoc_venue_form: true,
        hide_production_form: false
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

  add_show(body){
    this.props.newShow( body );
    this.setState(
      {
          hide_new_show_form: true,
          hide_venue_form: true,
          hide_edit_venue_form: true,
          venue: {venue_id: 0},
          hide_assoc_venue_form: true
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
                <input type="text" name="id" value={ d.currId } onChange={this.handleIDChange} />
              </label>
              <input type="submit" value="Submit" className="subbutt" />
            </form>
          : null
        }

        { (d.id) ? <Theater cb={this.alterTheaterCallback} perm={ this.props.User.level } theater={ this.props.Theater[0] }/> : null }

        { (v && v.length>0)
          ? <Venues id={ d.id } perm={ this.props.User.level } venues={ this.props.VenuesByTheater.venues} edit={ this.edit_venue_form } del={ this.deleteVenueCallback }/>
          : null }

        { (this.props.User.level > 1 )
          ?  <div> { (this.state.hide_edit_venue_form)
                ? null
                : <AddVenue states={ this.props.States.dropdown } show_what={ this.state } update={ this.update_venue }/>
              }

              { (this.state.hide_venue_form)
                ? <span className="list clickable" onClick={() => { this.blank_venue_form() }}>Add a Venue</span>
                : <AddVenue states={ this.props.States.dropdown } show_what={ this.state } update={ this.update_venue }/>
              }

              { (this.state.hide_assoc_venue_form)
                ? <span className="list clickable" onClick={() => { this.assoc_venue_form() }}>Associate a Venue</span>
                : <AddVenue states={ this.props.States.dropdown } show_what={ this.state } update={ this.update_venue }/>
              }

                { (this.state.hide_new_show_form)
                ? <h2 className="list clickable" onClick={() => { this.add_show_form() }}>Add a Show</h2>
                : <AddShow
                    artists={ this.props.Shows.artists }
                    addShowCB={ this.add_show }
                    addArtistCB={ this.addArtistCallback }
                    newArtist={ this.props.Shows.new_artist }
                  />
              }
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

        { (this.props.User.level > 1 )
          ? <div>
              { (this.state.hide_production_form)
                ? <h2 className="list clickable" onClick={() => { this.add_prod_form() }}>Add a Production</h2>
                : <AddProd
                    theaterid={ d.id }
                    artists={ this.props.Shows.artists }
                    addShowCB={ this.add_show }
                    newProdCB={ this.new_prod_cb }
                    addArtistCB={ this.addArtistCallback }
                    removeArtistCB={ this.removeArtistCallback }
                    newArtist={ this.props.Shows.new_artist }
                  />
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
    }
  }
}

export default Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);