import React, { useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { GET_HEADER, GET_POST_HEADER, URL } from '../constants/constants.js';


import Productions from "../Productions/prod_list";

const heart=<span style={{ color: 'red' }}>&#9829;</span>;

const FavePage = (props) => {
  const user = useSelector((state) => state.User);
  const [faves,setFaves] = useState({ upcoming: [], previous: [] });
  const API_URL=`${URL}faves/list/`;

  useEffect( () => {
    GET_POST_HEADER.body=JSON.stringify({ user_id: user.uid });
    (async function fetchData() {
      const response = await fetch(API_URL,GET_POST_HEADER);
      const data = await response.json();
      setFaves(data);
    })()
  }, [user]);

  return (
      <div className="theaters">
        <h2 className="main-page main-column">Favorites</h2>
        <div class="theater main-column">
        {(user.uid)
          ? <div className="description">Click the {heart} in the top right corner of any Production to add to your favorites list.</div>
          : <div className="description">Register your <b>free</b> account and you will be able to save productions that interest you to list list by clicking the {heart} in the top right corner of any production to add to your favorites list.</div>
        }
        </div>
        <Productions
          title='Productions'
          Prods={ faves }
          User={ user }
          Shows={null}
          perm={ false }
        />
      </div>
    )
}

export default FavePage;
