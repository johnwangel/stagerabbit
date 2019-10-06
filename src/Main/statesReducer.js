 import React, {Component} from 'react';
 import {
  UPDATE_STATES
 } from './statesActions';

const StatesReducer = (state={}, action) => {
    switch (action.type){
      case UPDATE_STATES:
        let s = action.payload.states;
        var states = Object.keys(s).map(function(key) {
          return [ s[key] ];
        });

        const items=[];
        items.push(<option key="sel_0" value="0">STATE</option>);
        for (let i = 0; i < states.length; i++) {
            let _this=states[i][0];
            items.push(<option key={_this.name} value={`${_this.id}-${_this.name}`}>{_this.abbr}</option>);
         }
        return { list: states, dropdown: items }
      default:
        return state;
    }
}

export default StatesReducer;




