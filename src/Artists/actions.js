//import { connect } from 'react-redux';
import { GET_HEADER } from '../constants/constants.js';

export const  SAVE_ARTIST = 'SAVE_ARTIST';
export const  REMOVE_ARTIST = 'REMOVE_ARTIST';

export function getArtists ( info ){

  return dispatch => {
    fetch(`http://localhost:3100/artists/?type=${info.type}&id=${info.id}`, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch( saveArtists( { data: data, type: info.type, id: info.id } ) )
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

const saveArtists = ( artists, type ) => ({
  type : SAVE_ARTIST,
  payload : artists
});

export function removeArtist ( body ){
  let header =  {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

  return dispatch => {
    fetch('http://localhost:3100/remove_artist', header )
    .then(response => response.json())
    .then(data => {
      dispatch( RemoveArtist( body ) );
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

const RemoveArtist = ( data ) => ({
  type : REMOVE_ARTIST,
  payload : data
});