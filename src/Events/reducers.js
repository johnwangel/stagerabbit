import React, {Component} from 'react';
import {
  EVENT_TYPES,
  NEW_EVENT,
  GET_EVENTS,
  EDIT_EVENT
} from './actions';

const moment = require('moment');
const today = moment.utc().format('YYYY-MM-DD');

const Events = (state={ types: [], events: { upcoming: [], previous: []  } }, action) => {
  switch (action.type){
    case EVENT_TYPES:
      return updateEventTypes(state,action);
    case NEW_EVENT:
      return { types: state.types, events: parseEvents(action.payload) };
    case GET_EVENTS:
      return { types: state.types, events: parseEvents(action.payload) };
    case EDIT_EVENT:
      return { types: state.types, events: parseEvents(action.payload) };
    default:
      return state;
  }
};

function updateEventTypes(state,action){
  var label = `Select an event type...`;
  switch (action.payload.label){
    case 1:
      label = `Any event type`;
      break;
  }

  const items=[];
  items.push(<option key="et_0" value="0">{label}</option>);
  action.payload.data.forEach( x => items.push(<option key={x.event_type_id} value={x.event_type_id}>{x.label}</option>) )
  return { types: items, events: state.events }
}

function parseEvents(events){
  const upcoming=[], previous=[];
  events.forEach( item => {
    let end=moment.utc(item.end_date).format('YYYY-MM-DD');
    let old = (today>end) ? previous.push(item) : upcoming.push(item);
  })
  return { upcoming, previous };
}

export default Events;