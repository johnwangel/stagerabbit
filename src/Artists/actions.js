import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  SAVE_ARTIST = 'SAVE_ARTIST';

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
