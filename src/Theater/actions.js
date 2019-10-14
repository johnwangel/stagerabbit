import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  UPDATE_THEATER_ID = 'UPDATE_THEATER_ID';
export const  UPDATE_THEATER    = 'UPDATE_THEATER';
export const  ALTER_THEATER     = 'ALTER_THEATER';
export const  THEATER_UPDATE    = 'THEATER_UPDATE';

export function theaterUpdate ( values ){
  return { type : THEATER_UPDATE , payload : values }
}

export function updateTheaterID ( theaterid ){
  return { type : UPDATE_THEATER_ID , payload : theaterid };
}

export function updateTheater ( theaterid ){
  return dispatch => {
    fetch(`${URL}?type=theater&id=${theaterid}`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(addTheaterSuccess(data.data)))
    .catch( err => console.log(err.message));
  };
}

const addTheaterSuccess = theater => ({
  type : UPDATE_THEATER,
  payload : { theater }
});

export function alterTheater ( body ){
  GET_POST_HEADER.body = JSON.stringify(body)
  return dispatch => {
    fetch(`${URL}theaters/alter_theater`, GET_POST_HEADER)
    .then(response => response.json())
    .then(data => dispatch(addTheaterUpdates(data.data)))
    .catch( err => console.log(err.message));
  };
}

const addTheaterUpdates = data => ({
  type : ALTER_THEATER,
  payload : { data }
});
