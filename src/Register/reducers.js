import { REGISTER, LOGIN, LOGOUT } from './actions';
import React from 'react';

const User = ( state = { level: 1, name: 'guest', token: null, loggedin: false, tid: null }, action ) => {
  switch (action.type){
    case REGISTER:
      return register(state,action);
    case LOGIN:
      return login(state,action);
    case LOGOUT:
      return logout(state,action);
    default:
      return state;
  }
};

function register(state,action){
  let user=action.payload;
  let name=`${user.fname} ${user.lname}`;
  let token=(user.token !=='')?user.token : null;
  let tid=user.tid;
  return { level: user.level, name: name, token: token, loggedin: true, tid: tid } ;
}

function login(state,action){
  let user=action.payload;
  let name=`${user.fname} ${user.lname}`;
  let token=(user.token !=='')?user.token : null;
  let tid=user.tid;
  let item={ level: user.level, name: name, token: token, loggedin: true, tid: tid };
  console.log('item in login',item)
  return item;
}

function logout(state,action){
  return { level: 1, name: 'guest', token: null, loggedin: false, tid: null } ;
}

export default User;
