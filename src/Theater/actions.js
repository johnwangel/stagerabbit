import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  UPDATE_THEATER_ID = 'UPDATE_THEATER_ID';
export const  UPDATE_THEATER    = 'UPDATE_THEATER';
export const  ALTER_THEATER     = 'ALTER_THEATER';
export const  THEATER_UPDATE    = 'THEATER_UPDATE';
export const  ADD_THEATER       = 'ADD_THEATER';
export const  ALL_THEATERS      = 'ALL_THEATERS';
export const  UPDATE_GEO        = 'UPDATE_GEO';

export function theaterUpdate ( values ){
  return { type : THEATER_UPDATE , payload : values }
}

export function updateTheaterID ( theaterid ){
  return { type : UPDATE_THEATER_ID , payload : theaterid };
}

export function allTheaters (){
  return dispatch => {
    fetch(`${URL}?type=alltheaters`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(all_theaters(data.data)))
    .catch( err => console.log(err.message));
  };
}

const all_theaters = theater => ({
  type : ALL_THEATERS,
  payload : { theater }
});

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
    .then(data => {
      console.log(data)
      let thtr=data;
      if (body.pos) thtr.pos=body.pos;
      dispatch(addTheaterUpdates(thtr))
    })
    .catch( err => console.log(err.message));
  };
}

const addTheaterUpdates = data => ({
  type : ALTER_THEATER,
  payload : { data }
});

export function addTheater ( body ){
  GET_POST_HEADER.body = JSON.stringify(body)
  return dispatch => {
    fetch(`${URL}theaters/add_theater`, GET_POST_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(addedTheater(data.theater));
    })
    .catch( err => console.log(err.message));
  };
}

const addedTheater = data => ({
  type : ADD_THEATER,
  payload : data
});


export function updateGeo ( body ){
  GET_POST_HEADER.body = JSON.stringify(body)
  return dispatch => {
    fetch(`${URL}theaters/update_geo`, GET_POST_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(newGeo(data.theater[0]));
    })
    .catch( err => console.log(err.message));
  };
}

const newGeo = data => ({
  type : UPDATE_GEO,
  payload : data
});