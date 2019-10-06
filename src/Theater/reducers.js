 import {
  THEATER_UPDATE
 } from './actions';

const TheaterUpdateReducers = (state = [ {id : null} ], action) => {
    switch (action.type){
      case THEATER_UPDATE:
        return theaterUpdate(state,action)
      default:
        return state;
    }
}

function theaterUpdate(state,action){
  return [ action.payload ];
}

export default TheaterUpdateReducers;