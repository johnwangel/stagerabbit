import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER } from '../constants/constants.js';

export const  UPDATE_THEATER_ID = 'UPDATE_THEATER_ID';
export const  UPDATE_THEATER    = 'UPDATE_THEATER';
export const  ALTER_THEATER     = 'ALTER_THEATER';

export function updateTheaterID ( theaterid ){
  return { type : UPDATE_THEATER_ID , payload : theaterid };
}

export function updateTheater ( theaterid ){
  return dispatch => {
    fetch('http://localhost:3100/?type=theater&id='+theaterid, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(addTheaterSuccess(data.data));
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

export function alterTheater ( body ){

  let header =  {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };

  return dispatch => {
    fetch('http://localhost:3100/alter_theater', header)
    .then(response => response.json())
    .then(data => {
      dispatch(addTheaterUpdates(data.data));
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

const addTheaterSuccess = theater => ({
  type : UPDATE_THEATER,
  payload : { theater }
});

const addTheaterUpdates = data => ({
  type : ALTER_THEATER,
  payload : { data }
});
