import {combineReducers} from "redux";

import ProdArtists from "../Artists/reducers.js";
import Prods from "../Productions/reducers.js";
import SearchResults from "../Results/reducers.js";
import Shows from "../Shows/reducers.js";
import States from "../Main/statesReducer.js";
import Theater from "../Theater/reducers.js";
import User from "../Register/reducers.js";
import VenuesByTheater from "../Venues/reducers.js";


const rootReducer = combineReducers({
    Prods,
    ProdArtists,
    SearchResults,
    Shows,
    States,
    Theater,
    VenuesByTheater,
    User
});

export default rootReducer;