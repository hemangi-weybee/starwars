import { combineReducers } from "redux";
import { peopleReducer, filmsReducer, planetReducer, speciesReducer, vehiclesReducer, starshipsReducer } from "./categoryReducers";

export default combineReducers({
    people: peopleReducer,
    planet: planetReducer,
    films: filmsReducer,
    species: speciesReducer,
    vehicles: vehiclesReducer,
    starships: starshipsReducer
})