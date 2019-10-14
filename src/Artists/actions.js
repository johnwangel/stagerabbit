import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  SAVE_ARTIST = 'SAVE_ARTIST';
export const  REMOVE_ARTIST = 'REMOVE_ARTIST';

export function getArtists ( info ){
  return dispatch => {
    fetch(`${URL}artists/?type=${info.type}&id=${info.id}`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch( saveArtists( { data: data, type: info.type, id: info.id } ) ) )
    .catch( err => console.log(err.message) );
  };
}

const saveArtists = ( artists, type ) => ({
  type : SAVE_ARTIST,
  payload : artists
});

export function removeArtist ( body ){
  GET_POST_HEADER.body= JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}artists/remove_artist`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch( RemoveArtist( body ) ) )
    .catch( err => console.log(err.message));
  };
}

const RemoveArtist = ( data ) => ({
  type : REMOVE_ARTIST,
  payload : data
});