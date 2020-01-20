 import {
  RESULTS,
  NORESULTS
 } from './actions';

const SearchResults = (state={ type: null, results: { theaters: [] } }, action) => {
    switch (action.type){
      case RESULTS:
        return action.payload;
      case NORESULTS:
        return { type: 0, results: [] };
      default:
        return state;
    }
}

export default SearchResults;