import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import { process_submit } from '../../constants/constants';
import { updateProds } from '../actions';
import "react-datepicker/dist/react-datepicker.css";

import AddArtist from "./addArtist";

var Moment = require('moment');

class AddProd extends Component {
  constructor(props) {
    super(props);

    const errRef=createRef();

    var c;
    (this.props.specs) ? c=this.props.specs : c=null;
    var p;
    (this.props.production) ? p=this.props.production : p=null;

    var sd=null, ed=null;
    if(p && p.start_date) {
      sd = Moment(p.start_date,"YYYY-MM-DD");
      ed = Moment(p.end_date,"YYYY-MM-DD");
    }

    this.state = {
      pid: (c) ? c.pid : null,
      editmode: (c) ? true : false,
      formTitle: (c) ? 'Edit Production' : 'Add Production',
      start : (sd) ? new Date(sd.year(),sd.month(),sd.date()) : new Date(),
      end:  (ed) ? new Date(ed.year(),ed.month(),ed.date()) : new Date(),
      venue_id: (c && c.venue && c.venue.venue_id) ? c.venue.venue_id : '0',
      venue_error: false,
      show_id: (c && c.sid) ? c.sid : '0',
      show_error: false,
      dirChildren: (c && c.dir && c.dir.length>0) ? c.dir.length : 1,
      dir_items: (c && c.dir && c.dir.length>0) ? c.dir : null,
      chorChildren: (c && c.chor && c.chor.length>0) ? c.chor.length : 1,
      chor_items: (c && c.chor && c.chor.length>0) ? c.chor : null,
      mdChildren: (c && c.md && c.md.length>0) ? c.md.length : 1,
      md_items: (c && c.md && c.md.length>0) ? c.md : null,
      cast: (p && p.cast) ? p.cast : '',
      description: (p && p.description) ? p.description : '',
      window: null,
      scroll: null
    };

    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.scrollToMyRef = this.scrollToMyRef.bind(this);
  }

  componentDidMount() {
    var body = document.body,
    html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    this.setState({ scroll: window.scrollY, window: height });
  }

  handleNew(e) {
    this.setState({ [e.target.id] : this.state[e.target.id]+1 })
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
    if (this.state.editmode) {
      body.prod_id=this.state.pid;
      this.props.edit_prod(body);
      this.props.prod_form();
    } else {
      this.props.newProdCB(body);
    }
  }

  scrollToMyRef(){
   window.scrollTo(0, this.errRef.offsetTop);
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  handleStartDateChange( date ) {
    console.log('start',date);
    this.setState({ start : date, end: date } );
  }

  handleEndDateChange( date ) {
    console.log('end',date);
    this.setState({ end : date } );
  }

  onDropdownSelected( e ) {
    this.setState({ [e.target.name] : e.target.value } );
  }

  render() {
    return (
      <div ref={ this.errRef } className='overlay' style={{height: this.state.window + 'px'}}>
        <div className="all_shows" style={{marginTop: this.state.scroll + 'px'}}>
          <div class="close" onClick={() => { this.props.prod_form() }} >&times;</div>
          <form id="form-1" onSubmit={this.handleSubmit}>
            <h1>{this.state.formTitle}</h1>

            { ( this.props.VenuesByTheater.list)
              ?         <div>
                           <h2>Venue</h2>
                           { (this.state.venue_error) ? <div className='error'>You must select a venue.</div> : null }
                           <select
                                  type="select"
                                  id="venue_by_theater"
                                  name="venue_id"
                                  value={this.state.venue_id}
                                  onChange={this.onDropdownSelected}>
                             {this.props.VenuesByTheater.list}
                           </select>
                        </div>
                : null
              }
            <h2>Show Title</h2>
            { (this.state.show_error) ? <div className='error'>You must select a show.</div> : null }
            <select
                  id="show_select"
                  type="select"
                  name="show_id"
                  value={this.state.show_id}
                  onChange={this.onDropdownSelected}>
              {this.props.Shows.shows}
            </select>


            <div>
              <h2>Start Date:</h2>
              <DatePicker
                id="start_date_1"
                name="start_date"
                selected={this.state.start}
                onChange={this.handleStartDateChange}
              />
            </div>

            <div>
              <h2>End Date:</h2>
              <DatePicker
                id="end_date_1"
                name="end_date"
                selected={this.state.end}
                onChange={this.handleEndDateChange}
              />
            </div>

            <div>
              <h2>Description</h2>
              <textarea
                    id="description_1"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange} />
            </div>

            <div>
              <h2>Cast</h2>
              <textarea
                  id="cast_1"
                  name="cast"
                  value={this.state.cast}
                  onChange={this.handleChange} />
            </div>

            <div id="dir-group">
            <h2>Director</h2>
              {
                [...Array(this.state.dirChildren)].map( (m,i,a) =>{
                  return <AddArtist
                              key={`d-${i}`}
                              num={i+1}
                              pid={ this.props.production }
                              type="dir"
                              title="Director"
                              editmode={this.state.editmode}
                              item={(this.state.dir_items) ? this.state.dir_items[i] : null}
                              sel={this.props.artists}
                              addArtistCB={ this.props.addArtistCB }
                              removeArtistCB={ this.props.removeArtistCB }
                              newArtist={ this.props.newArtist }
                            />
                })
              }
            </div>
            <div className='add-div' id="dirChildren" onClick={this.handleNew}>Another Director</div>

            <div id="chor-group">
              <h2>Choreographer</h2>
              {
                [...Array(this.state.chorChildren)].map( (m,i,a) =>{
                  return <AddArtist
                              key={`c-${i}`}
                              num={i+1}
                              pid={ this.props.production }
                              editmode={this.state.editmode}
                              type="chor"
                              title="Choreographer"
                              item={(this.state.chor_items) ? this.state.chor_items[i] : null}
                              sel={this.props.artists}
                              addArtistCB={ this.props.addArtistCB }
                              removeArtistCB={ this.props.removeArtistCB }
                              newArtist={ this.props.newArtist }
                            />
                })
              }
            </div>
            <div className='add-div' id="chorChildren" onClick={this.handleNew}>Another Choreo.</div>


            <div id="md-group">
              <h2>Music Director</h2>
              {
                [...Array(this.state.mdChildren)].map( (m,i,a) =>{
                  return <AddArtist
                              key={`md-${i}`}
                              num={i+1}
                              pid={ this.props.production }
                              type="md"
                              title="Music Director"
                              sel={this.props.artists}
                              editmode={this.state.editmode}
                              item={(this.state.md_items) ? this.state.md_items[i] : null}
                              addArtistCB={ this.props.addArtistCB }
                              removeArtistCB={ this.props.removeArtistCB }
                              newArtist={ this.props.newArtist }
                            />
                })
              }
            </div>
            <div className='add-div' id="mdChildren" onClick={this.handleNew}>Another MD</div>

            <input className='subbutt' id={ this.props.theaterid } type="submit" value="Submit Production" />
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
    updateProds: theaterid => {
      dispatch( updateProds(theaterid) )
    }
  }
}

AddProd = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProd);

export default AddProd;