import {
  UPDATE_THEATER_ID,
  UPDATE_THEATER,
  ALTER_THEATER
 } from './theaterActions';

const TheaterReducers = (state=[ { currId: null, id: null } ], action) => {
  switch (action.type){
    case UPDATE_THEATER_ID:
      return updateTheaterID(state,action)
    case UPDATE_THEATER:
      return updateTheater(state,action)
    case ALTER_THEATER:
      return alterTheater(state,action)
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
  console.log('THEATER in REDUCER',t)
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

export default TheaterReducers;