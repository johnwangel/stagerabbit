import { LOGIP, REGISTER, LOGIN, LOGOUT, LOGINERROR } from './actions';
import React from 'react';

const User = ( state = { level: 1, name: 'guest', token: null, loggedin: false, tid: null, message: null, client: null, uid: null }, action ) => {
  switch (action.type){
    case LOGIP:
      return log_ip(state,action);
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

function log_ip(state,action){
  let user=action.payload;
  let new_state= Object.assign({}, state);
  new_state.client=user.client_id;
  return new_state;
}

function register(state,action){
  let user=action.payload;
  let name=`${user.fname} ${user.lname}`;
  let token=(user.token !=='')?user.token : null;
  let tid=user.tid;
  return { level: user.level, name: name, token: token, loggedin: true, tid: tid, message: null, client: state.client} ;
}

function login(state,action){
  //console.log(action);
  let user=action.payload;
  let name=`${user.fname} ${user.lname}`;
  let token=(user.token !=='')?user.token : null;
  let tid=user.tid;
  let uid=user.id;
  let item={ level: user.level, name: name, token: token, loggedin: true, tid: tid, message: null, client: state.client, uid };
  return item;
}

function loginerr(state,action){
  const newstate = Object.assign({}, state);
  newstate.message = action.payload.message;
  return newstate;
}

function logout(state,action){
  return { level: 1, name: 'guest', token: null, loggedin: false, tid: null, message: null, client: state.client } ;
}

export default User;
