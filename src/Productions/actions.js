import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const UPDATE_PRODS = 'UPDATE_PRODS';
export const NEW_PROD = 'NEW_PROD';
export const EDIT_PROD = 'EDIT_PROD';

export function updateProds ( theaterid ){
  return dispatch => {
    fetch(`${URL}?type=productions&id=${theaterid}`, GET_HEADER)
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