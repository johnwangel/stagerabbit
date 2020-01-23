import React from 'react';
import { connect } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

export const  REGISTER = 'REGISTER';
export const  LOGIN = 'LOGIN';
export const  LOGOUT = 'LOGOUT';
export const  LOGINERROR = 'LOGINERROR';

export function register_user( body ){
  GET_POST_HEADER.body=JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}auth/register`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => {
        window.localStorage.setItem("token", data.jwt)
        dispatch(Registered(data));
    })
    .catch( err => console.log('THERE WAS AN ERROR'))
  }
}

const Registered = data => ({
  type : REGISTER,
  payload : data
});

export function getProfileFetch(){
  return dispatch => {
    const token = localStorage.token;
    let header = GET_HEADER;
    if (token) {
      header.headers.authorization=`JWT ${token}`;
      return fetch(`${URL}auth`, header )
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            localStorage.removeItem("token");
          } else {
            dispatch(loginUser(data.user));
          }
        });
    }
  }
}

export function login( body ){
  GET_POST_HEADER.body=JSON.stringify(body);
  return dispatch => {
    fetch(`${URL}auth/login`, GET_POST_HEADER )
    .then(response => response.json())
    .then(data => {
      if (data.message){
        dispatch( loginError( data ) );
      } else {
        window.localStorage.setItem( "token", data.jwt );
        dispatch( loginUser( data ) );
      }
    })
    .catch( err => console.log('THERE WAS AN ERROR'));
  }
}

const loginUser = user => ({
  type : LOGIN,
  payload : user
});

const loginError = msg => ({
  type : LOGINERROR,
  payload : msg
});

export function logout(){
  return dispatch => {
    localStorage.removeItem("token");
    dispatch(LogOut('logout'));
  }
}

const LogOut = data => ({
  type : LOGOUT,
  payload : data
});