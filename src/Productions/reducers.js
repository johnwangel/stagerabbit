 import {
  UPDATE_PRODS,
  NEW_PROD,
  EDIT_PROD,
  PROD_BY_SHOW
 } from './actions';

const moment = require('moment');
const today = moment.utc().format('YYYY-MM-DD');

const ProductionsReducer = (state={ upcoming: [], previous: [] }, action) => {
    switch (action.type){
      case UPDATE_PRODS:
        return updateProductions(state,action);
      case NEW_PROD:
        return newProduction(state,action);
      case EDIT_PROD:
        return editProduction(state,action);
      case PROD_BY_SHOW:
        return prodByShow(state,action);
      default:
        return state;
    }
}

function updateProductions(state,action){
  let p = action.payload.prods;
  var prods = Object.keys(p).map(function(key) {
    return p[key];
  });
  return parseProds(prods);
}

function newProduction(state,action){
  return parseProds( [ ...state, action.payload ] );
}

function editProduction(state,action){
  var n = action.payload;
  var clone = state.slice(0);
  clone.forEach( (c,i) => {
    if (c.production_id === n.production_id ) clone[i]=n;
  })
  return parseProds(clone);
}

function prodByShow(state,action){
  return { upcoming: action.payload, previous: [] };
}

function parseProds(prods){
  const upcoming=[], previous=[];
  prods.forEach( item => {
    let end=moment.utc(item.end_date).format('YYYY-MM-DD');
    let old = (today>end) ? previous.push(item) : upcoming.push(item);
  })
  return { upcoming, previous };
}

export default ProductionsReducer;