import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, URL } from '../constants/constants.js';

export const UPDATE_STATES='UPDATE_STATES';

export function getStates(){
  return dispatch => {
    fetch(`${URL}locations/states`, GET_HEADER)
    .then(response => response.json())
    .then(states => dispatch( addStates( states.data ) ) )
    .catch( err => console.log(err.message));
  };
};

const addStates = states => ({
  type : UPDATE_STATES,
  payload : { states }
});