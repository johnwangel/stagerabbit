import React, {Component} from 'react';
import { connect } from 'react-redux';

import SanitizedHTML from 'react-sanitized-html';

import Artists from "../Artists/artists";
import Venue from "../Venues/this_venue";
import AddShow from "../Shows/addshow";
import AddProd from "./AddProduction/addproduction";

const moment = require('moment');

class Productions extends Component {
  constructor(props) {
    super(props);
    this.state = { edit_show: false, edit_prod: false };
    this.show_form = this.show_form.bind(this);
    this.prod_form = this.prod_form.bind(this);
  }

  show_form(){
    this.setState({ edit_show: !this.state.edit_show, edit_prod: false});
  }

  prod_form(){
    this.setState({ edit_show: false, edit_prod: !this.state.edit_prod });
  }

  render() {
    let p = this.props.prod;
    let a = (p && p.artists) ? p.artists : null;
    let v = (p && p.venue.length ) ? p.venue[0] : null;

    return ( <div key={this.props.id+'-prod'}
                  id={this.props.prod.production_id}
                  className="production">

                <div className="show_title"><SanitizedHTML html={ p.title } /></div>

                <div className='show_dates'>
                  {moment.utc(p.start_date).format('MMMM D, YYYY')} to {moment.utc(p.end_date).format('MMMM D, YYYY')}
                </div>

                <table className="details-table"><tbody>
                  <tr><td>Genre:</td><td>{p.genre}</td></tr>
                  { ( a && a.book ) ? <Artists type="Book" artists={ a.book }/> : null }
                  { ( a && a.music ) ? <Artists type="Music" artists={ a.music }/> : null }
                  { ( a && a.lyrics ) ? <Artists type="Lyrics" artists={ a.lyrics }/> : null }
                  { ( a && a.pw ) ? <Artists type="Written" artists={ a.pw }/> : null }
                  { ( a && a.dir ) ? <Artists type="Directed" artists={ a.dir }/> : null }
                  { ( a && a.chor ) ? <Artists type= "Choreographed" artists={ a.chor }/> : null }
                  { ( a && a.md ) ? <Artists type="Musical Direction" artists={ a.md }/> : null }
                  { ( v ) ? <Venue ven={ v }/> : null}
                </tbody></table>

                { ( p.description !== '')
                      ?  ( <div className='description'>
                              <div className='title'><SanitizedHTML html='What&rsquo;s it about?' /></div>
                              <SanitizedHTML html={p.description} />
                            </div>)
                      : null
                }

                { ( p.cast_list)
                      ?  ( <div className='cast'>
                              <div className='title'><SanitizedHTML html='Who&rsquo;s in it?' /></div>
                              <SanitizedHTML html={p.cast_list} />
                            </div>)
                      : null
                }

                { (this.props.perm)
                  ? <div className='edit-prod-buttons'>
                      { (!this.state.edit_show)
                          ? <span className="form-button-3"
                                  onClick={() => { this.show_form() }}>
                                Update Show
                              </span>
                          : <AddShow
                              production={ this.props.prod }
                              creatives={ a }
                              artists={ this.props.shows.artists }
                              addArtistCB={ this.props.addArtistCB }
                              newArtist={ this.props.shows.new_artist }
                              removeArtistShowCB={ this.props.removeArtistShowCB }
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
                              creatives={ a }
                              specs={ this.state }
                              artists={ this.props.shows.artists }
                              addArtistCB={ this.props.addArtistCB }
                              removeArtistProdCB={ this.props.removeArtistProdCB }
                              newArtist={ this.props.shows.new_artist }
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

export default Productions;