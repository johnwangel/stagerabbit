import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const SEARCH_THEATERS = 'SEARCH_THEATERS';

export function theater_search ( body ){
  GET_POST_HEADER.body=JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}search/ByCity`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(addTheResults(data)))
    .catch( err => console.log('THERE WAS AN ERROR'));
  }
}

const addTheResults = res => ({
  type : SEARCH_THEATERS,
  payload : res
});