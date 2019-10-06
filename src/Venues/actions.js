import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER } from '../constants/constants.js';

export const  GET_VENUES_BY_THEATER = 'GET_VENUES_BY_THEATER';
export const  GET_THIS_VENUE = 'GET_THIS_VENUE';
export const  GET_ALL_VENUES = 'GET_ALL_VENUES';
export const  UPDATE_VENUES = 'UPDATE_VENUES';

export function getAllVenues(){
  return dispatch => {
    fetch('http://localhost:3100/?type=venues_all', GET_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(VenuesAll(data.data));
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

export function getVenuesByTheater ( tid ){
  return dispatch => {
    fetch('http://localhost:3100/?type=venues_by_theater&id='+tid, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(Venues(data.data));
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

export function getVenueByProduction ( pid ){
  return dispatch => {
    fetch('http://localhost:3100/?type=venue_by_production&id='+pid, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(ThisVenue(data.data));
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

export function updateVenues( body ){
    let header =  {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
    return dispatch => {
      fetch('http://localhost:3100/updateVenue', header )
      .then(response => response.json())
      .then(data => {
        dispatch(UpdateVenues(data));
      })
      .catch( err => {
        console.log('THERE WAS AN ERROR');
      })
    }
}

const VenuesAll = venues => ({
  type : GET_ALL_VENUES,
  payload : { venues }
});

const Venues = venues => ({
  type : GET_VENUES_BY_THEATER,
  payload : { venues }
});

const ThisVenue = venue => ({
  type : GET_THIS_VENUE,
  payload : { venue }
});

const UpdateVenues = venues => ({
  type : UPDATE_VENUES,
  payload : venues
});
