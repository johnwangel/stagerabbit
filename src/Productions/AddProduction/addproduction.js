import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import parseISO from 'date-fns/parseISO'

import { process_submit } from '../../constants/constants';
import { getPosition } from '../../constants/helpers';
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

    var sd=new Date(), ed=new Date();

    if(p && p.start_date) {
      sd = parseISO(Moment.utc(p.start_date).format('YYYY-MM-DD'));
      ed = parseISO(Moment.utc(p.end_date).format('YYYY-MM-DD'));
    }

    this.state = {
      pid: (c) ? c.pid : null,
      editmode: (c) ? true : false,
      formTitle: (c) ? 'Update Production' : 'Add Production',
      start : sd,
      end:  ed,
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
      height: null,
      scroll: null,
      expand_desc: false,
      expand_cast: false,
      expand_dir: false,
      expand_chor: false,
      expand_md: false
    };

    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleExpand = this.handleExpand.bind(this)
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.scrollToMyRef = this.scrollToMyRef.bind(this);
  }

  componentDidMount() {
    this.setState(getPosition());
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
    this.setState({ start : date, end: date } );
  }

  handleEndDateChange( date ) {
    this.setState({ end : date } );
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
    return (
      <div ref={ this.errRef } className='overlay' style={{height: this.state.height + 'px'}}>
        <div className="overlay-container" style={{marginTop: this.state.scroll + 'px'}}>
          <div className="close" onClick={() => { this.props.prod_form() }} >&times;</div>
          <h2 className="form-title">{this.state.formTitle}</h2>
          <form id="form-1" onSubmit={this.handleSubmit}>
            { ( this.props.VenuesByTheater.list)
              ? <div className='form-group'>
                  <div className="label">Venue:</div>
                   { (this.state.venue_error)
                      ? <div className='error'>You must select a venue.</div>
                      : null
                   }
                   <select className="form-select wide"
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
            <div className='form-group'>
              <div className="label">Show Title:</div>
              { (this.state.show_error)
                ? <div className='error'>You must select a show.</div>
                : null
              }
              <select
                    className="form-select wide"
                    id="show_select"
                    type="select"
                    name="show_id"
                    value={this.state.show_id}
                    onChange={this.onDropdownSelected}>
                {this.props.Shows.shows}
              </select>
            </div>
            <div className='form-group'>
              <div className="label">Start Date:</div>
              <DatePicker
                id="start_date_1"
                name="start_date"
                selected={this.state.start}
                onChange={this.handleStartDateChange}
              />
            </div>

            <div className='form-group'>
              <div className="label">End Date:</div>
              <DatePicker
                id="end_date_1"
                name="end_date"
                selected={this.state.end}
                onChange={this.handleEndDateChange}
              />
            </div>

            <div className='form-group'>
              <h4 onClick={ () => { this.handleExpand(1) } } className="form-title expand">
                <span id="desc-show" className="plus">{ (this.state.expand_desc) ? '-' : '+' }</span>Description:
              </h4>
              <div id="desc-display" className={ (this.state.expand_desc) ? "add_artist show" : "add_artist" }>
                <textarea
                      id="description_1"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange} />
              </div>
            </div>

            <div className='form-group'>
              <h4 onClick={ () => { this.handleExpand(2) } } className="form-title expand">
                <span id="cast-show" className="plus">{ (this.state.expand_cast) ? '-' : '+' }</span>Cast
              </h4>
              <div id="desc-display" className={ (this.state.expand_cast) ? "add_artist show" : "add_artist" }>
                <textarea
                    id="cast_1"
                    name="cast"
                    value={this.state.cast}
                    onChange={this.handleChange} />
              </div>
            </div>

            <div id="dir-group">
              <h4 onClick={ () => { this.handleExpand(3) } } className='form-title expand'>
                <span id="dir-show" className="plus">{ (this.state.expand_dir) ? '-' : '+' }</span>Director
              </h4>
              <div id="dir-display" className={ (this.state.expand_dir) ? "add_artist show" : "add_artist" }>
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

                <div className='another-artist'
                     id="dirChildren"
                     onClick={this.handleNew}>
                  <span className="plus">+</span>
                  Another Director
                </div>
              </div>
            </div>

            <div id="chor-group">
              <h4 onClick={  () => { this.handleExpand(4) } } className='form-title expand'>
                <span id="dir-show" className="plus">{ (this.state.expand_chor) ? '-' : '+' }</span>Choreographer
              </h4>
              <div id="chor-display" className={ (this.state.expand_chor) ? "add_artist show" : "add_artist" }>
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
                <div className='another-artist'
                     id="chorChildren"
                     onClick={this.handleNew}>
                  <span className="plus">+</span>
                  Another Choreograher
                </div>
              </div>
            </div>

            <div id="md-group">
              <h4 onClick={ () => { this.handleExpand(5) } }  className='form-title expand'>
                  <span id="dir-show" className="plus">{ (this.state.expand_md) ? '-' : '+' }</span>Music Director
              </h4>
              <div id="md-display" className={ (this.state.expand_md) ? "add_artist show" : "add_artist" }>
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

              <div className='another-artist'
                   id="mdChildren"
                   onClick={this.handleNew}>
                <span className="plus">+</span>
                Another MD
              </div>
            </div>
          </div>

            <input
                className='form-button'
                id={ this.props.theaterid }
                type="submit"
                value="Submit Production"/>
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