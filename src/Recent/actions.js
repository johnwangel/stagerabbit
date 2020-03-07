import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const RECENT_UPDATES = 'RECENT_UPDATES';

export function recentUpdates(){
  return dispatch => {
    fetch(`${URL}productions/recentprods`, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      console.log('prods',data);
      dispatch(recents_updates(data));
    })
    .catch( err => console.log(err.message));
  };
}

const recents_updates = data => ({
  type : RECENT_UPDATES,
  payload : data
});