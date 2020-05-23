import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const CLIENTS = 'CLIENTS';

export function getClients(){
  return dispatch => {
    fetch(`${URL}admin/clients`, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      dispatch(get_clients(data));
    })
    .catch( err => console.log(err.message));
  };
}

const get_clients = data => ({
  type : CLIENTS,
  payload : data
});