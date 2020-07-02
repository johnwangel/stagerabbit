 import {
  RESULTS,
  NORESULTS
 } from './actions';


 import {
  LOGIN_RESULTS
 } from '../Register/actions';


const SearchResults = (state={ type: null, results: { theaters: [] } }, action) => {
    switch (action.type){
      case LOGIN_RESULTS:
        let new_data = { type: 1, results: action.payload };
        return new_data;
      case RESULTS:
        return action.payload;
      case NORESULTS:
        return { type: 0, results: [] };
      default:
        return state;
    }
}

export default SearchResults;