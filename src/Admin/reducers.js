 import {
  CLIENTS
 } from './actions';

const moment = require('moment');

const Admin = (state={ clients: [] }, action) => {
    switch (action.type){
      case CLIENTS:
         return setClients(state,action);
      default:
        return state;
    }
}

function setClients(state,action){
  let newstate=Object. assign({}, state);
  newstate.clients=action.payload;
  return newstate;
}

export default Admin;