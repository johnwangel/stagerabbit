 import {
  SEARCH_THEATERS
 } from './actions';

const SearchReducer = (state=[], action) => {
    switch (action.type){
      case SEARCH_THEATERS:
        return updateResults(state,action);
      default:
        return state;
    }
}

function updateResults(state,action){
  let p = action.payload;
  return [ ...p ];
}

export default SearchReducer;