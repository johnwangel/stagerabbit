import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const NORESULTS = 'NORESULTS';
export const RESULTS = 'RESULTS';

export function search ( body ){
  GET_POST_HEADER.body=JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}search/${body.searchType}`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => {
      if (data.length>0){
        dispatch( addTheResults( { type: body.type, results: data } ) )
      } else {
        dispatch( no_results() )
      }
    })
    .catch( err => console.log('THERE WAS AN ERROR'));
  }
}

const addTheResults = res => ({
  type : RESULTS,
  payload : res
});

const no_results = () => ({
  type : NORESULTS,
  payload : null
});