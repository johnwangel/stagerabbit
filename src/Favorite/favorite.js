import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';

const Favorite = (props) => {
  const [fave,setFave] = useState({ curr: null, prev: null });
  const API_URL=`${URL}faves`;
  const reg = props.uid ? 'reg' : 'noreg';

  useEffect( () => {
    if ( (!props.uid && !props.pid) ) return;
    let ids={ user_id: props.uid, production_id: props.pid  };
    GET_POST_HEADER.body=JSON.stringify();
    (fave.prev !== null && fave.curr !== fave.prev ) ? ids.liked=fave.curr : ids.init=true;
    GET_POST_HEADER.body=JSON.stringify(ids);
    (async function fetchData() {
      const response = await fetch(API_URL,GET_POST_HEADER);
      const data = await response.json();
      if (fave.curr===null){
        //initial instance
        let prev=fave.curr;
        (data.length && data[0].liked) ? setFave({ curr: true, prev  }) : setFave({ curr: false, prev });
      }
    })()
  }, [props.uid,props.pid,fave.curr,fave.prev]);

  return (
      <div className={`favorite ${fave.curr} ${reg}`}
           onClick={ () => setFave( prevState => { return { prev: prevState.curr , curr: !prevState.curr,  }} ) } >
              &#9829;
          <div className='login_message'>You will need to create a free account to favorite a production. Then your favorite productions can be found on the menu under My Stuff.</div>
      </div>
    )
}

export default Favorite;