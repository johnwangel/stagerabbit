 import React from 'react';
 import SanitizedHTML from 'react-sanitized-html';
 import {
  ALL_SHOWS,
  ALL_ARTISTS,
  NEW_SHOW,
  NEW_ARTIST,
  EDIT_SHOW,
  REMOVE_ARTIST_FROM_SHOW
 } from './actions';
 import { makeArray } from '../constants/constants';

const ShowsReducers = (state = { shows: [], artists: [],  new_artist: null, removed_artist: null }, action) => {
  switch (action.type){
    case ALL_SHOWS:
      return allShows(state,action);
    case ALL_ARTISTS:
      return allArtists(state,action);
    case NEW_SHOW:
      return showAdded(state,action);
    case EDIT_SHOW:
      return showAdded(state,action);
    case NEW_ARTIST:
      return artistAdded(state,action);
    case REMOVE_ARTIST_FROM_SHOW:
      return removeArtist(state,action);
    default:
      return state;
  }
}

function allShows(state,action){
  return { shows: do_shows(action.payload), artists: state.artists, new_artist: null, removed_artist: null };
}

function allArtists(state,action){
  return { shows: state.shows, artists: do_artists(action.payload), new_artist: null, removed_artist: null  };
}

function showAdded(state,action){
  return { shows: do_shows(action.payload.shows), artists: do_artists(action.payload.artists), new_artist: null, removed_artist: null  };
}

function artistAdded(state,action){
  return { shows: state.shows, artists: do_artists(action.payload.artists), new_artist: action.payload.new_artist, removed_artist: null  };
}

function removeArtist(state,action){
  return { shows: state.shows, artists: do_artists(action.payload.data.artists), new_artist: null, removed_artist: action.payload.data.artists.body.artist_id  };
}

function do_artists(artists){
  let dropdown=[];
  dropdown.push(<option key="artists-0" value="0">Select an existing artist...</option>);
  dropdown.push(<option key="artists-00" value="-1">Add artist...</option>)
  for (let i = 0; i < artists.length; i++) {
    let _this=artists[i];
    dropdown.push(<option key={`artist-${i}`} value={_this.id}>{_this.lname}, {_this.fname}</option>);
  }
  return [...dropdown ];
}

function do_shows(shows){
  let dropdown=[];
  dropdown.push(<option key="show-0" value="0">Select one...</option>)
  for (let i = 0; i < shows.length; i++) {
    let _this=shows[i];
    dropdown.push(<option key={_this.title+'-'+_this.id} value={_this.id}>{_this.title.replace(/&rsquo;/g, "'")} ({_this.genre})</option>);
  }
  return [ ...dropdown ];
}

export default ShowsReducers;