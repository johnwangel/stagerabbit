import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  GET_VENUES_BY_THEATER = 'GET_VENUES_BY_THEATER';
export const  GET_THIS_VENUE = 'GET_THIS_VENUE';
export const  GET_ALL_VENUES = 'GET_ALL_VENUES';
export const  UPDATE_VENUES = 'UPDATE_VENUES';

export function getAllVenues(){
  return dispatch => {
    fetch(`${URL}?type=venues_all`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(VenuesAll(data.data)))
    .catch( err => console.log(err.message));
  };
}

const VenuesAll = venues => ({
  type : GET_ALL_VENUES,
  payload : { venues }
});

export function getVenuesByTheater ( tid ){
  return dispatch => {
    fetch(`${URL}?type=venues_by_theater&id=${tid}`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(Venues(data.data)))
    .catch( err => console.log(err.message));
  };
}

const Venues = venues => ({
  type : GET_VENUES_BY_THEATER,
  payload : { venues }
});

export function getVenueByProduction ( pid ){
  return dispatch => {
    fetch(`${URL}?type=venue_by_production&id=${pid}`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(ThisVenue(data.data)))
    .catch( err => console.log(err.message));
  };
}

const ThisVenue = venue => ({
  type : GET_THIS_VENUE,
  payload : { venue }
});

export function updateVenues( body ){
  GET_POST_HEADER.body=JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}venues/updateVenue`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(UpdateVenues(data)))
    .catch( err => console.log('THERE WAS AN ERROR'));
  };
}

const UpdateVenues = venues => ({
  type : UPDATE_VENUES,
  payload : venues
});