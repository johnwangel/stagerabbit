import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const UPDATE_PRODS = 'UPDATE_PRODS';
export const NEW_PROD = 'NEW_PROD';
export const EDIT_PROD = 'EDIT_PROD';
export const PROD_BY_SHOW = 'PROD_BY_SHOW';
export const PROD_BY_SHOW_GROUP = 'PROD_BY_SHOW_GROUP';
export const REMOVE_ARTIST_FROM_PROD = 'REMOVE_ARTIST_FROM_PROD';

export function updateProds ( theaterid ){
  return dispatch => {
    fetch(`${URL}productions/byCompany/?id=${theaterid}`, GET_HEADER)
    .then(response => response.json())
    .then(data => dispatch(ProductionsSuccess(data.data)))
    .catch( err => console.log(err.message));
  };
}

const ProductionsSuccess = prods => ({
  type : UPDATE_PRODS,
  payload : { prods }
});

export function newProd ( body ){
  GET_POST_HEADER.body=JSON.stringify(body)
  return dispatch => {
    fetch(`${URL}productions/addprod`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(addTheProd(data)))
    .catch( err => console.log('THERE WAS AN ERROR'))
  };
}

const addTheProd = prod => ({
  type : NEW_PROD,
  payload : prod
});

export function editProd(body){
  GET_POST_HEADER.body=JSON.stringify(body)
  return dispatch => {
    fetch(`${URL}productions/editProd`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch(EditProd(data)))
    .catch( err => console.log(err.message));
  };
}

const EditProd = data => ({
  type : EDIT_PROD,
  payload : data
});

export function prodsByShow(id){
  return dispatch => {
    fetch(`${URL}productions/byShow?id=${id}`, GET_HEADER )
    .then(response => response.json())
    .then(data => dispatch(prods_by_show(data)))
    .catch( err => console.log(err.message));
  };
}
const prods_by_show = data => ({
  type : PROD_BY_SHOW,
  payload : data
});

export function prodsByShowGroup(id){
  return dispatch => {
    fetch(`${URL}productions/byShowGroup?id=${id}`, GET_HEADER )
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      dispatch(prods_by_show_group(data))
    })
    .catch( err => console.log(err.message));
  };
}
const prods_by_show_group = data => ({
  type : PROD_BY_SHOW_GROUP,
  payload : data
});

export function removeArtistFromProd ( body ){
  body.fromWhere='prod';
  GET_POST_HEADER.body= JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}artists/remove_artist`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => dispatch( RemoveArtistFromProd( data.data ) ) )
    .catch( err => console.log(err.message));
  };
}

const RemoveArtistFromProd = ( data ) => ({
  type : REMOVE_ARTIST_FROM_PROD,
  payload : data
});