 import {
  RECENT_UPDATES
 } from './actions';

const moment = require('moment');

const Recents = (state=[], action) => {
    switch (action.type){
      case RECENT_UPDATES:
         return setRecents(state,action);
      default:
        return state;
    }
}

function setRecents(state,action){
  return action.payload;
}

export default Recents;