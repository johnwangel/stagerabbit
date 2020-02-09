import { GET_VENUES_BY_THEATER, GET_THIS_VENUE, GET_ALL_VENUES, UPDATE_VENUES } from './actions';
import { makeArray } from '../constants/constants';
import React from 'react';

const VenuesByTheaterReducers = (state = { venues: [], list: [], byprod: [], all: [] }, action) => {
  switch (action.type){
    case GET_VENUES_BY_THEATER:
      return vbt(state,action);
    case GET_THIS_VENUE:
      return vbp(state,action);
    case GET_ALL_VENUES:
      return vall(state,action);
    case UPDATE_VENUES:
      return vup(state,action);
    default:
      return state;
  }
};

function vall(state,action){
  let venues = makeArray(action.payload.venues);
  let newArr = [ ...venues ];
  var new_dropdown = dropdown(newArr)
  return { venues: state.venues, list: state.list, byprod: state.byprod, all: new_dropdown } ;
}

function vbt(state,action){
  let venues = makeArray(action.payload.venues);
  let newArr = [ ...venues ];
  var new_dropdown = dropdown(newArr)
  return { venues: newArr, list: new_dropdown, byprod: state.byprod, all: state.all } ;
}

function vbp(state,action){
  console.log('VENUES',action.payload)

  let curr=state.byprod;
  curr.push(action.payload.venue[0])
  return { venues: state.venues, list: state.list, byprod: curr, all: state.all };
}

function vup(state,action){
  var bytheater = action.payload.byTheater;
  var bytheater_dropdown=dropdown(bytheater)
  var all_dropdown = dropdown(action.payload.all);
  const obj = { venues: bytheater, list: bytheater_dropdown, byprod: state.byprod, all: all_dropdown };
  return obj;
}

function dropdown(v){
  let dropdown=[];
  dropdown.push(<option key='v-0' value='0'>Select one...</option>)
  for (let i = 0; i < v.length; i++) {
    let _this=v[i];
    let _thiskey= `va-${_this.venue_id}`;
    dropdown.push(<option key={_thiskey} value={_this.venue_id}>{_this.venue_name}, {_this.venue_add1}, {_this.venue_city}, {_this.venue_state}</option>);
   }
   return dropdown;
}

export default VenuesByTheaterReducers;