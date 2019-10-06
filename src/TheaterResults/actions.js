
import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER } from '../constants/constants.js';

export const SEARCH_THEATERS = 'SEARCH_THEATERS';

export function theater_search ( body ){
    let header =  {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
    return dispatch => {
      fetch('http://localhost:3100/searchByCity', header )
      .then(response => response.json())
      .then(data => {
        let dt = data;
        dispatch(addTheResults(dt))
      })
      .catch( err => {
        console.log('THERE WAS AN ERROR');
      })
    }
}

const addTheResults = res => ({
  type : SEARCH_THEATERS,
  payload : res
});