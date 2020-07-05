import {combineReducers} from "redux";

import Admin from "../Admin/reducers.js";
import Events from "../Events/reducers.js";
import ProdArtists from "../Artists/reducers.js";
import Prods from "../Productions/reducers.js";
import Recents from "../Recent/reducers.js";
import SearchResults from "../Results/reducers.js";
import Shows from "../Shows/reducers.js";
import States from "../Main/statesReducer.js";
import Specialties from "../Specialties/reducers.js";
import Theater from "../Theater/reducers.js";
import User from "../Register/reducers.js";
import VenuesByTheater from "../Venues/reducers.js";

const rootReducer = combineReducers({
    Admin,
    Events,
    Prods,
    ProdArtists,
    Recents,
    SearchResults,
    Shows,
    Specialties,
    States,
    Theater,
    VenuesByTheater,
    User
});

export default rootReducer;