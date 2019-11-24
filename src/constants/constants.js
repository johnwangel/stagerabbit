//export const URL = 'http://localhost:3100/';
export const URL = 'https://theater.stagerabbit.com/';

export const GET_HEADER = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      };

export const GET_POST_HEADER = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      };

export const makeArray = obj => {
  var arr = Object.keys(obj).map(function(key) {
    return obj[key];
  });
  return arr;
};

export const checkVenue = ( all_venues, pid ) => {
  let this_venue=null;
  let tp = 'production_id';
  if ( all_venues.length > 0 ){
      all_venues.forEach( v => {
          let comp=-null;
          if (v[tp]) {
            comp=v[tp]
          } else if (v[0] && v[0][tp]) {
            comp=v[0][tp];
          }
          if (comp === pid) this_venue=v;
      })
    }

    return this_venue;
}

export const process_submit = el => {
  let body={};
  for (var i = el.length - 1; i >= 0; i--) {
    if (el[i].value && el[i].value !=="0") {
      let id=el[i].id, val=el[i].value;
      body[id]=val;
    }
  }
  return body;
}