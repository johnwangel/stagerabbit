 import {
  THEATER_UPDATE,
  UPDATE_THEATER_ID,
  UPDATE_THEATER,
  ALTER_THEATER,
  ADD_THEATER
 } from './actions';

const TheaterReducers = (state=[ { currId: null, id: null } ], action) => {
  switch (action.type){
    case THEATER_UPDATE:
        return theaterUpdate(state,action);
    case UPDATE_THEATER_ID:
      return updateTheaterID(state,action);
    case UPDATE_THEATER:
      return updateTheater(state,action);
    case ALTER_THEATER:
      return alterTheater(state,action);
    case ADD_THEATER:
      return addTheater(state,action);
    default:
      return state;
  }
};

function updateTheaterID(state,action){
  state[0].currId=action.payload;
  return state;
}

function updateTheater(state,action){
  let t = action.payload.theater;
  var theater = Object.keys(t).map(function(key) {
    return [ t[key] ];
  });
  return theater[0];
}

function alterTheater(state,action){
  let t = action.payload.data;
  var theater = Object.keys(t).map(function(key) {
    return [ t[key] ];
  });
  return theater[0];
}


function theaterUpdate(state,action){
  return [ action.payload ];
}

function addTheater(state,action){
  action.payload[0].currId=action.payload[0].id;
  return [ action.payload[0] ];
}



export default TheaterReducers;