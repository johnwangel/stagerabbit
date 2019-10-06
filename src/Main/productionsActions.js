
import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER } from '../constants/constants.js';

export const UPDATE_PRODS = 'UPDATE_PRODS';
export const NEW_PROD = 'NEW_PROD';
export const EDIT_PROD = 'EDIT_PROD';

export function updateProds ( theaterid ){
  return dispatch => {
    fetch('http://localhost:3100/?type=productions&id='+theaterid, GET_HEADER)
    .then(response => response.json())
    .then(data => {
      dispatch(ProductionsSuccess(data.data))
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

export function newProd ( body ){
    let header =  {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
    return dispatch => {
      fetch('http://localhost:3100/addprod', header )
      .then(response => response.json())
      .then(data => {
        let dt = data;
        console.log('DATA FROM NEW PROD', data)
        dispatch(addTheProd(dt))
      })
      .catch( err => {
        console.log('THERE WAS AN ERROR');
      })
    }
}

const ProductionsSuccess = prods => ({
  type : UPDATE_PRODS,
  payload : { prods }
});


const addTheProd = prod => ({
  type : NEW_PROD,
  payload : prod
});

export function editProd(body){

  let header =  {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

  return dispatch => {
    fetch('http://localhost:3100/editProd', header )
    .then(response => response.json())
    .then(data => {


      dispatch(EditProd(data));
    })
    .catch( err => {
      console.log(err.message);
    });
  };
}

const EditProd = data => ({
  type : EDIT_PROD,
  payload : data
});