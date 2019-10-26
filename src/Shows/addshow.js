import React, {Component} from 'react';
import { connect } from 'react-redux';

import { process_submit } from '../constants/constants';

import AddArtist from "../Productions/AddProduction/addArtist";

class AddShow extends Component {
  constructor(props) {
    super(props);
    var c;
    (this.props.creatives) ? c=this.props.creatives : c=null;

    this.state = {
      editmode: (c) ? true : false,
      formTitle: (c) ? 'Edit Show' : 'Add Show',
      bookChildren: (c && c.book && c.book.length>0) ? c.book.length : 1,
      book_items: (c && c.book && c.book.length>0) ? c.book : null,
      musicChildren: (c && c.music && c.music.length>0) ? c.music.length : 1,
      music_items: (c && c.music && c.music.length>0) ? c.music : null,
      lyricsChildren: (c && c.lyrics && c.lyrics.length>0) ? c.lyrics.length : 1,
      lyrics_items: (c && c.lyrics && c.lyrics.length>0) ? c.lyrics : null,
      pwChildren:  (c && c.pw && c.pw.length>0) ? c.pw.length : 1,
      pw_items: (c && c.pw && c.pw.length>0) ? c.pw : null,
      show_title: (c) ? this.props.production.title : '',
      musical: (c && this.props.production.genre_id<5) ? true : false,
      play: (c && this.props.production.genre_id>=5) ? true : false,
      show_select: (c) ? `${this.props.production.show_id}` :'0',
      showtitle: (c) ? false : true,
      genre_1: (c) ? `${this.props.production.genre_id}` :'0',
      window: null,
      scroll: null
    };

    this.handleNew = this.handleNew.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.showtitle = this.showtitle.bind(this);
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
    return (<div className='overlay' style={{height: this.state.window + 'px'}}>
            <div class="add_show" style={{marginTop: this.state.scroll + 'px'}}>
            <div class="close" onClick={() => { this.props.show_form() }} >&times;</div>
            <form id="form-1" onSubmit={this.handleSubmit}>
              <h1>{this.state.formTitle}</h1>
              <h2>Title:</h2>
              { ( this.state.showtitle )
                  ?  <input
                        key="show-title-1"
                        id="show_title_1"
                        type="text"
                        name="show_title"
                        value={this.state.show_title}
                        onChange={this.handleChange} />

                    : <div>
                        <select
                              id="show_select"
                              type="select"
                              name="sel_show"
                              value={this.state.show_select}
                              onChange={this.onDropdownSelected}>
                          {this.props.Shows.shows}
                        </select>
                        <div className="edit_tools inter">
                          <span className="list clickable" onClick={() => { this.showtitle() }}>Edit Name</span>
                        </div>
                      </div>
              }

              <h2>Genre:</h2>
              <select
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

              { (this.state.musical)
                ?  <div>
                      <div id="book-group">
                        <h2>Book By:</h2>
                        {
                          [...Array(this.state.bookChildren)].map( (m,i,a) =>{
                            return <AddArtist
                                      key={`b-${i}`}
                                      num={i+1}
                                      editmode={this.state.editmode}
                                      assoc="show"
                                      type="book"
                                      title="Bookwriter"
                                      item={(this.state.book_items) ? this.state.book_items[i] : null}
                                      sel={this.props.artists}
                                      addArtistCB={ this.props.addArtistCB }
                                      removeArtistCB={ this.props.removeArtistCB }
                                      newArtist={ this.props.newArtist }
                                    />
                          })
                        }
                      </div>
                      <div className='add-div' id="bookChildren" onClick={this.handleNew}>Another Bookwriter</div>

                      <div id="music-group">
                        <h2>Music By:</h2>
                        {
                          [...Array(this.state.musicChildren)].map( (m,i,a) =>{
                            return <AddArtist
                                        key={`m-${i}`}
                                        num={i+1}
                                        editmode={this.state.editmode}
                                        assoc="show"
                                        type="music"
                                        title="Composer"
                                        item={(this.state.music_items) ? this.state.music_items[i] : null}
                                        sel={this.props.artists}
                                        addArtistCB={ this.props.addArtistCB }
                                        removeArtistCB={ this.props.removeArtistCB }
                                        newArtist={ this.props.newArtist }
                                    />
                          })
                        }
                      </div>
                      <div className='add-div' id="musicChildren" onClick={this.handleNew}>Another Composer</div>

                      <div id="lyrics-group">
                        <h2>Lyrics By:</h2>
                        {
                          [...Array(this.state.lyricsChildren)].map( (m,i,a) =>{
                            return <AddArtist
                                          key={`l-${i}`}
                                          num={i+1}
                                          editmode={this.state.editmode}
                                          assoc="show"
                                          type="lyrics"
                                          title="Lyricist"
                                          item={(this.state.lyrics_items) ? this.state.lyrics_items[i] : null}
                                          sel={this.props.artists}
                                          addArtistCB={ this.props.addArtistCB }
                                          removeArtistCB={ this.props.removeArtistCB }
                                          newArtist={ this.props.newArtist }
                                      />
                          })
                        }
                      </div>
                      <div className='add-div' id="lyricsChildren" onClick={this.handleNew}>Another Lyricist</div>
                    </div>
                  : null
              }

              { (this.state.play)
                  ? <div>
                      <div id="pw-group">
                        <h2>Written By:</h2>
                        {
                          [...Array(this.state.pwChildren)].map( (m,i,a) =>{
                            return <AddArtist
                                          key={`p-${i}`}
                                          num={i+1}
                                          editmode={this.state.editmode}
                                          assoc="show"
                                          type="pw"
                                          title="Playwright"
                                          item={(this.state.pw_items) ? this.state.pw_items[i] : null}
                                          sel={this.props.artists}
                                          addArtistCB={ this.props.addArtistCB }
                                          removeArtistCB={ this.props.removeArtistCB }
                                          newArtist={ this.props.newArtist }
                                      />
                          })
                        }
                      </div>
                      <div className='add-div' id="pwChildren" onClick={this.handleNew}>Another Playwright</div>
                    </div>
                  : null
              }

              <input className='subbutt' type="submit" value={this.state.formTitle} />
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