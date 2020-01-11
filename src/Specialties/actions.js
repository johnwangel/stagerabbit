import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, URL } from '../constants/constants.js';

export const UPDATE_SPECIALTIES='UPDATE_SPECIALTIES';

export function getSpecialties(){
  return dispatch => {
    fetch(`${URL}specialties/`, GET_HEADER)
    .then(response => response.json())
    .then(specialties => dispatch( changeSpecialty( specialties.data ) ) )
    .catch( err => console.log(err.message));
  };
};

const changeSpecialty = specialties => ({
  type : UPDATE_SPECIALTIES,
  payload : specialties
});