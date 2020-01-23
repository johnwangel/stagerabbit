import { REGISTER, LOGIN, LOGOUT, LOGINERROR } from './actions';
import React from 'react';

const User = ( state = { level: 1, name: 'guest', token: null, loggedin: false, tid: null, message: null }, action ) => {
  switch (action.type){
    case REGISTER:
      return register(state,action);
    case LOGIN:
      return login(state,action);
    case LOGOUT:
      return logout(state,action);
    case LOGINERROR:
      return loginerr(state,action);
    default:
      return state;
  }
};

function register(state,action){
  let user=action.payload;
  let name=`${user.fname} ${user.lname}`;
  let token=(user.token !=='')?user.token : null;
  let tid=user.tid;
  return { level: user.level, name: name, token: token, loggedin: true, tid: tid, message: null } ;
}

function login(state,action){
  let user=action.payload;
  let name=`${user.fname} ${user.lname}`;
  let token=(user.token !=='')?user.token : null;
  let tid=user.tid;
  let item={ level: user.level, name: name, token: token, loggedin: true, tid: tid, message: null };
  return item;
}

function loginerr(state,action){
  const newstate = Object.assign({}, state);
  newstate.message = action.payload.message;
  return newstate;
}

function logout(state,action){
  return { level: 1, name: 'guest', token: null, loggedin: false, tid: null, message: null } ;
}

export default User;
