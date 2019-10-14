 import {
  SAVE_ARTIST,
  REMOVE_ARTIST
 } from './actions';

 import { makeArray } from '../constants/constants';

const ArtistsReducers = (state = { book: [], lyrics: [], music: [], pw: [], dir: [], chor: [], md: [] }, action) => {
  switch (action.type){
    case SAVE_ARTIST:
      return save_artist(state,action);
    case REMOVE_ARTIST:
      return remove_artist(state,action);
    default:
      return state;
  }
}

function save_artist(state,action){
  if (action.payload.type===1){
    let book={ artists: action.payload.data.book, sid: action.payload.id};
    let book_all = [ ...state.book, book ];
    let music={ artists: action.payload.data.music, sid: action.payload.id};
    let music_all = [ ...state.music, music ];
    let lyrics={ artists: action.payload.data.lyrics, sid: action.payload.id};
    let lyrics_all = [ ...state.lyrics, lyrics ];
    let pw={ artists: action.payload.data.pw, sid: action.payload.id};
    let pw_all = [ ...state.pw, pw ];
    return {  book: book_all,
              music: music_all,
              lyrics: lyrics_all,
              pw: pw_all,
              dir: state.dir,
              chor: state.chor,
              md: state.md
            };
  }
  if (action.payload.type===2){
    let dir={ artists: action.payload.data.dir, pid: action.payload.id};
    let dir_all = [ ...state.dir, dir ];
    let chor={ artists: action.payload.data.chor, pid: action.payload.id};
    let chor_all = [ ...state.chor, chor ];
    let md={ artists: action.payload.data.md, pid: action.payload.id};
    let md_all = [ ...state.md, md ];
    return {  book: state.book,
              music: state.music,
              lyrics: state.lyrics,
              pw: state.pw,
              dir: dir_all,
              chor: chor_all,
              md: md_all
            };
  }
}

function remove_artist(state,action){
  const obj = Object.assign( {}, state );
  const arr = state[action.payload.type];

  let field;
  switch (action.payload.assoc){
    case ('show'):
      field='sid';
    case ('production'):
      field='pid'
  }

  arr.forEach( (c,i,a) => {
    if (c[field]===action.payload.assoc_id && c.artists.length>0){
      c.artists.forEach( (c1,i1,a1) => {
        if (c1.artist_id==action.payload.artist_id) {
          c.artists.splice(i1,1);
        }
      });
    }
  });

  obj[action.payload.type]=arr;
  return obj;

}

export default ArtistsReducers;