import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  ALL_SHOWS    = 'ALL_SHOWS';
export const  ALL_ARTISTS  = 'ALL_ARTISTS';
export const  NEW_SHOW  = 'NEW_SHOW';
export const  NEW_ARTIST  = 'NEW_ARTIST';
export const  EDIT_SHOW  = 'EDIT_SHOW';
export const  REMOVE_ARTIST ='REMOVE_ARTIST';

export function getAllShows(){
  return dispatch => {
    fetch(`${URL}?type=all_shows`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(AllShows(data.data)))
    .catch( err => console.log(err.message));
  };
}

const AllShows = shows => ({
  type : ALL_SHOWS,
  payload : shows
});

export function getAllArtists(){
  return dispatch => {
    fetch(`${URL}?type=all_artists`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(AllArtists(data.data)))
    .catch( err => console.log(err.message));
  };
}

const AllArtists = artists => ({
  type : ALL_ARTISTS,
  payload : artists
});

export function newShow(body){
  GET_POST_HEADER.body= JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}shows/addShow`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(NewShow(data)))
    .catch( err => console.log(err.message));
  };
}

const NewShow = data => ({
  type : NEW_SHOW,
  payload : data
});

export function newArtist(body){
  GET_POST_HEADER.body= JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}artists/addartist`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => {
      data.new_artist=body;
      data.new_artist.nid=data.newID;
      dispatch(NewArtist(data));
    })
    .catch( err => console.log(err.message));
  };
}

const NewArtist = data => ({
  type : NEW_ARTIST,
  payload : data
});

export function editShow(body){
  GET_POST_HEADER.body= JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}shows/editShow`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(EditShow(data)))
    .catch( err => console.log(err.message));
  };
}

const EditShow = data => ({
  type : EDIT_SHOW,
  payload : data
});