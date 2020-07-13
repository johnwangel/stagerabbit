import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const EVENT_TYPES = 'EVENT_TYPES';
export const NEW_EVENT = 'NEW_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const EDIT_EVENT ='EDIT_EVENT';

export function getEventTypes (){
  return dispatch => {
    fetch(`${URL}events/types/`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(EventTypes(data)))
    .catch( err => console.log(err.message));
  };
}

const EventTypes = types => ({
  type : EVENT_TYPES,
  payload : types
});

export function editEvent ( body ){
  GET_POST_HEADER.body=JSON.stringify(body);
  console.log('update event',body);
  return dispatch => {
    fetch(`${URL}events/editevent`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(edit_event(data)))
    .catch( err => console.log('THERE WAS AN ERROR'))
  };
}

const edit_event = event => ({
  type : EDIT_EVENT,
  payload : event
});

export function newEvent ( body ){
  GET_POST_HEADER.body=JSON.stringify(body)
  return dispatch => {
    fetch(`${URL}events/addevent`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(addTheEvent(data)))
    .catch( err => console.log('THERE WAS AN ERROR'))
  };
}

const addTheEvent = event => ({
  type : NEW_EVENT,
  payload : event
});



export function getEvents ( theaterid ){
  return dispatch => {
    fetch(`${URL}events/byCompany/?id=${theaterid}`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(get_events(data)))
    .catch( err => console.log(err.message));
  };
}

const get_events = events => ({
  type : GET_EVENTS,
  payload : events
});

