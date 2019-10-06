import {combineReducers} from "redux";

import ProdArtists from "../Artists/reducers.js";
import Prods from "../Main/productionsReducers.js";
import SearchTheaters from "../TheaterResults/reducers.js";
import Shows from "../Shows/reducers.js";
import States from "../Main/statesReducer.js";
import Theater from "../Main/theaterReducers.js";
import TheaterUpdates from "../Theater/reducers.js";
import VenuesByTheater from "../Venues/reducers.js";

const rootReducer = combineReducers({
    Prods,
    ProdArtists,
    SearchTheaters,
    Shows,
    States,
    Theater,
    TheaterUpdates,
    VenuesByTheater
});

export default rootReducer;