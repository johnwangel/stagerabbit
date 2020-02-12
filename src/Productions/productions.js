import React, {Component} from 'react';
import { connect } from 'react-redux';

import SanitizedHTML from 'react-sanitized-html';

import { checkVenue } from '../constants/constants.js';

import { getArtists } from '../Artists/actions';

import { getVenueByProduction } from '../Venues/actions';

import Artists from "../Artists/artists";
import Venue from "../Venues/this_venue";
import AddShow from "../Shows/addshow";
import AddProd from "./AddProduction/addproduction";

const moment = require('moment');

class Productions extends Component {
  constructor(props) {
    super(props);
    let sid = this.props.prod.show_id;
    let pid = this.props.prod.production_id;
    this.props.getArtists({ id: sid, type: 1 });
    this.props.getArtists({ id: pid, type: 2 });
    this.props.getVenueByProduction(pid);
    this.state = {  pid: this.props.prod.production_id,
                    sid: sid,
                    book : null,
                    music: null,
                    lyrics: null,
                    pw: null,
                    dir: null,
                    chor: null,
                    md: null,
                    venue: null,
                    edit_show: false,
                    edit_prod: false
                  };
    this.show_form = this.show_form.bind(this);
    this.prod_form = this.prod_form.bind(this);
  }

  componentDidUpdate(prevState,prevProps) {
    let sid = this.props.prod.show_id;
    let pid = this.props.prod.production_id;

    if (this.state.pid !== this.props.prod.production_id){
      this.setState({
                      pid: this.props.prod.production_id,
                      sid: this.props.prod.show_id,
                      book: null,
                      music: null,
                      lyrics: null,
                      pw: null,
                      dir: null,
                      chor: null,
                      md: null,
                      venue: null,
                    });
      this.props.getArtists({ id: sid, type: 1 });
      this.props.getArtists({ id: pid, type: 2 });
      this.props.getVenueByProduction(pid);
      this.forceUpdate();
    } else {

      let orig={
          book: (this.state.book) ?  this.state.book.length : 0,
          music: (this.state.music) ?  this.state.music.length : 0,
          lyrics: (this.state.lyrics) ?  this.state.lyrics.length : 0,
          pw: (this.state.pw) ?  this.state.pw.length : 0,
          dir: (this.state.dir) ?  this.state.dir.length : 0,
          chor: (this.state.chor) ?  this.state.chor.length : 0,
          md: (this.state.md) ?  this.state.md.length : 0,
      }

      let arr=['book','lyrics','music','pw'];
      arr.forEach(x => {
        let item = this.props.ProdArtists[x].find( i => i.sid===sid );
        if (item && item.artists.length > 0 && !this.state[x]) this.setState({ [x] : item.artists });
      });

      arr=['dir','chor','md'];
      arr.forEach(x => {
        let item = this.props.ProdArtists[x].find( i => i.pid===pid );
        if (item && item.artists.length > 0 && !this.state[x]) this.setState({ [x] : item.artists });
      })

      let updated={
          book: (this.state.book) ?  this.state.book.length : 0,
          music: (this.state.music) ?  this.state.music.length : 0,
          lyrics: (this.state.lyrics) ?  this.state.lyrics.length : 0,
          pw: (this.state.pw) ?  this.state.pw.length : 0,
          dir: (this.state.dir) ?  this.state.dir.length : 0,
          chor: (this.state.chor) ?  this.state.chor.length : 0,
          md: (this.state.md) ?  this.state.md.length : 0,
      };

      let changed=false;
      for ( var k in orig ){
        if ( orig[k] > updated[k]) changed=true;
      }
      if (changed) this.forceUpdate();


      if (this.props.VenuesByTheater.byprod) {
        let this_venue = checkVenue(this.props.VenuesByTheater.byprod, pid);
        if ( this_venue && !this.state.venue ) this.setState( { venue : this_venue } );
      }
    }
  }

  show_form(){
    this.setState({ edit_show: !this.state.edit_show, edit_prod: false});
  }

  prod_form(){
    this.setState({ edit_show: false, edit_prod: !this.state.edit_prod });
  }

  render() {
    let p = this.props.prod;
    return ( <div key={this.props.id+'-prod'}
                  id={this.props.prod.production_id}
                  className="production">

                <div className="show_title"><SanitizedHTML html={ p.title } /></div>

                <div className='show_dates'>
                  {moment.utc(p.start_date).format('MMMM D, YYYY')} to {moment.utc(p.end_date).format('MMMM D, YYYY')}
                </div>

{/*                <div className='genre-container'>
                <span className="genre">{g1}</span><span className="genre">{g2}</span></div>*/}

                <table className="details-table"><tbody>
                  <tr><td>Genre:</td><td>{p.genre}</td></tr>
                  { ( this.state.venue ) ? <Venue ven={ this.state.venue }/> : null}
                  { ( this.state.book ) ? <Artists type="Book" artists={ this.state.book }/> : null }
                  { ( this.state.music ) ? <Artists type="Music" artists={ this.state.music }/> : null }
                  { ( this.state.lyrics ) ? <Artists type="Lyrics" artists={ this.state.lyrics }/> : null }
                  { ( this.state.pw ) ? <Artists type="Written" artists={ this.state.pw }/> : null }
                  { ( this.state.dir ) ? <Artists type="Directed" artists={ this.state.dir }/> : null }
                  { ( this.state.chor ) ? <Artists type= "Choreographed" artists={ this.state.chor }/> : null }
                  { ( this.state.md ) ? <Artists type="Musical Direction" artists={ this.state.md }/> : null }
                </tbody></table>

                { ( p.description !== '')
                      ?  ( <div className='description'><SanitizedHTML html={p.description} /></div>)
                      : null
                }

                { (this.props.perm > 1)
                  ? <div className='edit-prod-buttons'>
                      { (!this.state.edit_show)
                          ? <span className="form-button-3"
                                  onClick={() => { this.show_form() }}>
                                Update Show
                              </span>
                          : <AddShow
                              production={ this.props.prod }
                              creatives={ this.state }
                              artists={ this.props.Shows.artists }
                              addArtistCB={ this.props.addArtistCB }
                              newArtist={ this.props.Shows.new_artist }
                              removeArtistCB={ this.props.removeArtistCB }
                              edit_show={ this.props.edit_show }
                              show_form={ this.show_form }
                            />
                        }
                        { (!this.state.edit_prod)
                           ? <span className="form-button-3"
                                   onClick={() => { this.prod_form() }}>
                                Update Production
                              </span>
                           : <AddProd
                              production={ this.props.prod }
                              specs={ this.state }
                              artists={ this.props.Shows.artists }
                              addArtistCB={ this.props.addArtistCB }
                              removeArtistCB={ this.props.removeArtistCB }
                              newArtist={ this.props.Shows.new_artist }
                              edit_prod={ this.props.edit_prod }
                              prod_form={ this.prod_form }
                            />
                        }

                    </div>
                  : null
                }


              </div>

            )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    getArtists: data => {
      dispatch( getArtists(data) )
    },
    getVenueByProduction: pid => {
      dispatch( getVenueByProduction(pid) )
    }
  }
}

Productions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Productions);

export default Productions;