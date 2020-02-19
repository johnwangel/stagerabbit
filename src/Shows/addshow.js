import React, {Component} from 'react';
import { connect } from 'react-redux';

import { process_submit } from '../constants/constants';
import { getPosition } from '../constants/helpers';

import AddArtist from "../Productions/AddProduction/addArtist";

class AddShow extends Component {
  constructor(props) {
    super(props);
    var c=(this.props.creatives) ? this.props.creatives : null;

    this.state = {
      editmode: (c) ? true : false,
      formTitle: (c) ? 'Update Show' : 'Add Show',
      book: (c && c.book && c.book.length) ? c.book : null,
      bookChildren: (c && c.book && c.book.length>0) ? c.book.length : 1,
      music: (c && c.music && c.music.length>0) ? c.music : null,
      musicChildren: (c && c.music && c.music.length>0) ? c.music.length : 1,
      lyrics: (c && c.lyrics && c.lyrics.length>0) ? c.lyrics : null,
      lyricsChildren: (c && c.lyrics && c.lyrics.length>0) ? c.lyrics.length : 1,
      playwright: (c && c.pw && c.pw.length>0) ? c.pw : null,
      pwChildren:  (c && c.pw && c.pw.length>0) ? c.pw.length : 1,
      show_title: (c) ? this.props.production.title : '',
      musical: (c && this.props.production.genre_id<5) ? true : false,
      play: (c && this.props.production.genre_id>=5) ? true : false,
      show_select: (c) ? `${this.props.production.show_id}` :'0',
      showtitle: (c) ? false : true,
      genre_1: (c) ? `${this.props.production.genre_id}` :'0',
      height: null,
      scroll: null
    };

    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.showtitle = this.showtitle.bind(this);
  }

  componentDidMount() {
    this.setState(getPosition());
  }

  handleNew(e) {
    this.setState({ [e.target.id] : this.state[e.target.id]+1 })
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = process_submit(e.target.elements);
    body.show_id=this.state.show_select;
    body.show_title=this.state.show_title;
    if (this.state.editmode) {
      this.props.edit_show(body);
      this.props.show_form();
    } else {
      this.props.addShowCB(body);
    }
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  showtitle(){
    this.setState({ showtitle: true })
  }

  onDropdownSelected(e){
    this.setState({ [e.target.id] : e.target.value })
    if (e.target.id==='genre_1')
      switch (e.target.value) {
        case '2':
        case '3':
        case '4':
          this.setState({ musical: true, play: false, genresel: e.target.value });
          break;
        case '5':
        case '6':
          this.setState({ musical: false, play: true, genresel: e.target.value });
      }
  }

  render() {

    let c = (this.props.creatives) ? this.props.creatvies : null;

    return (<div className='overlay' style={{height: this.state.height + 'px'}}>
            <div className="overlay-container" style={{marginTop: this.state.scroll + 'px'}}>
              <div className="close" onClick={() => { this.props.show_form() }} >&times;</div>
              <h2 className='form-title'>{this.state.formTitle}</h2>
              <form id="form-1" onSubmit={this.handleSubmit}>
                    { ( this.state.showtitle )
                        ? <div className='form-group'>
                            <div className="label">Title:</div>
                            <input
                                  className="form-select wide"
                                  key="show-title-1"
                                  id="show_title_1"
                                  type="text"
                                  name="show_title"
                                  value={this.state.show_title}
                                  onChange={this.handleChange} />
                            </div>
                          : <div className='form-group'>
                              <div className="label">Title:</div>
                              <select
                                    className="form-select wide"
                                    id="show_select"
                                    type="select"
                                    name="sel_show"
                                    value={this.state.show_select}
                                    onChange={this.onDropdownSelected}>
                                {this.props.Shows.shows}
                              </select>
                              <div className="edit_buttons">
                                <span
                                    className="form-button-2"
                                    onClick={() => { this.showtitle() }}>
                                  Edit Title
                                </span>
                              </div>
                            </div>
                      }

                  <div className='form-group'>
                    <div className="label">Genre:</div>
                      <select
                            className="form-select wide"
                            id="genre_1"
                            key="genre-1"
                            type="select"
                            name="genre"
                            value={this.state.genre_1}
                            onChange={this.onDropdownSelected} >
                        <option key="genre-0" value="0">Select one...</option>
                        <option key="genre-1" value="2">musical, comedy</option>
                        <option key="genre-2" value="3">musical, drama</option>
                        <option key="genre-3" value="4">musical, revue</option>
                        <option key="genre-4" value="5">play, comedy</option>
                        <option key="genre-5" value="6">play, drama</option>
                      </select>
                  </div>

                  { (this.state.musical)
                    ?  <div className="creatives">
                          <div id="book-group">
                             <h3 className='form-title'>Book By:</h3>
                            {
                              [...Array(this.state.bookChildren)].map( (m,i,a) =>{
                                return <AddArtist
                                          key={`b-${i}`}
                                          num={i+1}
                                          editmode={this.state.editmode}
                                          assoc="show"
                                          type="book"
                                          title="Bookwriter"
                                          item={(this.state.book && this.state.book.length) ? this.state.book[i] : null}
                                          sel={this.props.artists}
                                          addArtistCB={ this.props.addArtistCB }
                                          removeArtistCB={ this.props.removeArtistShowCB }
                                          newArtist={ this.props.newArtist }
                                        />
                              })
                            }
                            <div className='another-artist'
                                 id="bookChildren"
                                 onClick={this.handleNew}>
                              <span className="plus">+</span>
                              Another Bookwriter
                            </div>
                          </div>

                          <div id="music-group">
                            <h3 className='form-title'>Music By:</h3>
                            {
                              [...Array(this.state.musicChildren)].map( (m,i,a) =>{
                                return <AddArtist
                                            key={`m-${i}`}
                                            num={i+1}
                                            editmode={this.state.editmode}
                                            assoc="show"
                                            type="music"
                                            title="Composer"
                                            item={(this.state.music && this.state.music.length) ? this.state.music[i] : null}
                                            sel={this.props.artists}
                                            addArtistCB={ this.props.addArtistCB }
                                            removeArtistCB={ this.props.removeArtistShowCB }
                                            newArtist={ this.props.newArtist }
                                        />
                              })
                            }
                            <div className='another-artist'
                                 id="musicChildren"
                                 onClick={this.handleNew}>
                              <span className="plus">+</span>
                              Another Composer
                            </div>
                          </div>

                          <div id="lyrics-group">
                            <h3 className='form-title'>Lyrics By:</h3>
                            {
                              [...Array(this.state.lyricsChildren)].map( (m,i,a) =>{
                                return <AddArtist
                                              key={`l-${i}`}
                                              num={i+1}
                                              editmode={this.state.editmode}
                                              assoc="show"
                                              type="lyrics"
                                              title="Lyricist"
                                              item={(this.state.lyrics && this.state.lyrics.length) ? this.state.lyrics[i] : null}
                                              sel={this.props.artists}
                                              addArtistCB={ this.props.addArtistCB }
                                              removeArtistCB={ this.props.removeArtistShowCB }
                                              newArtist={ this.props.newArtist }
                                          />
                              })
                            }
                            <div className='another-artist'
                                 id="lyricsChildren"
                                 onClick={this.handleNew}>
                              <span className="plus">+</span>
                              Another Lyricist
                            </div>
                          </div>
                        </div>
                      : null
                  }

                { (this.state.play)
                    ? <div className="creatives">
                        <div id="pw-group">
                          <h3 className='form-title'>Written By:</h3>
                          {
                            [...Array(this.state.pwChildren)].map( (m,i,a) =>{
                              return <AddArtist
                                            key={`p-${i}`}
                                            num={i+1}
                                            editmode={this.state.editmode}
                                            assoc="show"
                                            type="pw"
                                            title="Playwright"
                                            item={(this.state.pw && this.state.pw.length) ? this.state.pw[i] : null}
                                            sel={this.props.artists}
                                            addArtistCB={ this.props.addArtistCB }
                                            removeArtistCB={ this.props.removeArtistShowCB }
                                            newArtist={ this.props.newArtist }
                                        />
                            })
                          }
                        </div>
                        <div className='another-artist'
                             id="pwChildren"
                             onClick={this.handleNew}>
                          <span className="plus">+</span>
                          Another Playwright
                        </div>
                      </div>
                    : null
                }

                <input className='form-button' type="submit" value={this.state.formTitle} />
            </form>
          </div>
        </div>
        )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

AddShow = connect(
  mapStateToProps
)(AddShow);

export default AddShow;