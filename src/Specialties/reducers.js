 import React, {Component} from 'react';
 import {
  UPDATE_SPECIALTIES
 } from './actions';

const SpecialtiesReducer = (state={}, action) => {
    switch (action.type){
      case UPDATE_SPECIALTIES:
        let s = action.payload;

        const items=[];
        items.push(<option key="sel_0" value="0">Select one...</option>);
        s.forEach( (i, idx) => items.push(<option key={idx} value={`${i.id}`}>{i.name}</option>)  )
        return { list: s, dropdown: items }
      default:
        return state;
    }
}

export default SpecialtiesReducer;