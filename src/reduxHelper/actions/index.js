import axios from 'axios';
import _ from 'lodash';

import baseAxios from "../baseAxios";

import { FETCH_PEOPLE_LOADING, FETCH_PEOPLE_SUCCESS, FETCH_PEOPLE_ERROR, FETCH_PEOPLE_DETAIL } from "../service/constants";
import { FETCH_PLANET_LOADING, FETCH_PLANET_SUCCESS, FETCH_PLANET_ERROR, FETCH_PLANET_DETAIL } from "../service/constants";
import { FETCH_FILMS_LOADING, FETCH_FILMS_SUCCESS, FETCH_FILMS_ERROR, FETCH_FILMS_DETAIL } from "../service/constants";
import { FETCH_SPECIES_LOADING, FETCH_SPECIES_SUCCESS, FETCH_SPECIES_ERROR, FETCH_SPECIES_DETAIL } from "../service/constants";
import { FETCH_VEHICLES_LOADING, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_ERROR, FETCH_VEHICLES_DETAIL, } from "../service/constants";
import { FETCH_STARSHIPS_LOADING, FETCH_STARSHIPS_SUCCESS, FETCH_STARSHIPS_ERROR, FETCH_STARSHIPS_DETAIL } from "../service/constants";

const _fetchPeople = _.memoize(async (pageNo, dispatch) => {
    dispatch({
        type: FETCH_PEOPLE_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/people?page=${pageNo}`);
        const obj = { page: pageNo, results: response.data.results, count: response.data.count };
        dispatch({
            type: FETCH_PEOPLE_SUCCESS,
            payload: obj
        });

    } catch (error) {
        dispatch({
            type: FETCH_PEOPLE_ERROR,
            payload: error.message
        });
    }
});
export const fetchPeople = (pageNo) => dispatch => _fetchPeople(pageNo, dispatch);

const _fetchPlanet = _.memoize(async (pageNo, dispatch) => {
    dispatch({
        type: FETCH_PLANET_LOADING,
        payload: true
    });

    try {
        const response = await baseAxios.get(`/planets?page=${pageNo}`);
        const obj = { page: pageNo, results: response.data.results, count: response.data.count };
        dispatch({
            type: FETCH_PLANET_SUCCESS,
            payload: obj
        });

    } catch (error) {
        dispatch({
            type: FETCH_PLANET_ERROR,
            payload: error.message
        });
    }
});
export const fetchPlanet = (pageNo) => dispatch => _fetchPlanet(pageNo, dispatch);

const _fetchFilms = _.memoize(async (pageNo, dispatch) => {
    dispatch({
        type: FETCH_FILMS_LOADING,
        payload: true
    });

    try {
        const response = await baseAxios.get(`/films?page=${pageNo}`);
        const obj = { page: pageNo, results: response.data.results, count: response.data.count };
        dispatch({
            type: FETCH_FILMS_SUCCESS,
            payload: obj
        });

    } catch (error) {
        dispatch({
            type: FETCH_FILMS_ERROR,
            payload: error.message
        });
    }
});
export const fetchFilms = (pageNo) => dispatch => _fetchFilms(pageNo, dispatch);

const _fetchSpecies = _.memoize(async (pageNo, dispatch) => {
    dispatch({
        type: FETCH_SPECIES_LOADING,
        payload: true
    });

    try {
        const response = await baseAxios.get(`/species?page=${pageNo}`);
        const obj = { page: pageNo, results: response.data.results, count: response.data.count };
        dispatch({
            type: FETCH_SPECIES_SUCCESS,
            payload: obj
        });

    } catch (error) {
        dispatch({
            type: FETCH_SPECIES_ERROR,
            payload: error.message
        });
    }
});
export const fetchSpecies = (pageNo) => dispatch => _fetchSpecies(pageNo, dispatch);

const _fetchVehicles = _.memoize(async (pageNo, dispatch) => {
    dispatch({
        type: FETCH_VEHICLES_LOADING,
        payload: true
    });

    try {
        const response = await baseAxios.get(`/vehicles?page=${pageNo}`);
        const obj = { page: pageNo, results: response.data.results, count: response.data.count };
        dispatch({
            type: FETCH_VEHICLES_SUCCESS,
            payload: obj
        });

    } catch (error) {
        dispatch({
            type: FETCH_VEHICLES_ERROR,
            payload: error.message
        });
    }
});
export const fetchVehicles = (pageNo) => dispatch => _fetchVehicles(pageNo, dispatch);

const _fetchStarships = _.memoize(async (pageNo, dispatch) => {
    dispatch({
        type: FETCH_STARSHIPS_LOADING,
        payload: true
    });

    try {
        const response = await baseAxios.get(`/starships?page=${pageNo}`);
        const obj = { page: pageNo, results: response.data.results, count: response.data.count };
        dispatch({
            type: FETCH_STARSHIPS_SUCCESS,
            payload: obj
        });

    } catch (error) {
        dispatch({
            type: FETCH_STARSHIPS_ERROR,
            payload: error.message
        });
    }
});
export const fetchStarships = (pageNo) => dispatch => _fetchStarships(pageNo, dispatch);


//fetch array 
const fetchMultiple = async (url) => {
    const result = [];
    try {
        for (let i = 0; i < url.length; i++) {
            const response = await axios.get(url[i]);
            result.push(response.data);
        }
        return result;
    } catch (err) {
        return err;
    }
}

//details
export const fetchPeopleDetail = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_PEOPLE_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/people/${id}`);
        const allData = response.data;

        const homeworldResponse = response.data.homeworld && response.data.homeworld.length ? await fetchMultiple([response.data.homeworld]) : 'No related Homeworld found';
        const filmsResponse = response.data.films.length ? await fetchMultiple(response.data.films) : 'No related Films found';
        const speciesResponse = response.data.species.length ? await fetchMultiple(response.data.species) : 'No related Species found';
        const vehiclesResponse = response.data.vehicles.length ? await fetchMultiple(response.data.vehicles) : 'No related Vehicles found';
        const starshipsResponse = response.data.starships.length ? await fetchMultiple(response.data.starships) : 'No related Starships found';

        dispatch({
            type: FETCH_PEOPLE_DETAIL,
            payload: {
                all: {
                    name: allData.name,
                    height: allData.height,
                    mass: allData.mass,
                    hair_color: allData.hair_color,
                    skin_color: allData.skin_color,
                    eye_color: allData.eye_color,
                    birth_year: allData.birth_year,
                    gender: allData.gender,
                },
                related: {
                    planets: homeworldResponse,
                    films: filmsResponse,
                    species: speciesResponse,
                    vehicles: vehiclesResponse,
                    starships: starshipsResponse
                }
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_PEOPLE_ERROR,
            payload: error.message
        });
    }
};

export const fetchPlanetDetail = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_PLANET_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/planets/${id}`);
        const allData = response.data;

        const peopleResponse = response.data.residents.length ? await fetchMultiple(response.data.residents) : 'No related people found';
        const filmsResponse = response.data.films.length ? await fetchMultiple(response.data.films) : 'No related Films found';

        dispatch({
            type: FETCH_PLANET_DETAIL,
            payload: {
                all: {
                    name: allData.name,
                    rotation_period: allData.rotation_period,
                    orbital_period: allData.orbital_period,
                    diameter: allData.diameter,
                    climate: allData.climate,
                    gravity: allData.gravity,
                    terrain: allData.terrain,
                    surface_water: allData.surface_water,
                    population: allData.population,
                },
                related: {
                    people: peopleResponse,
                    films: filmsResponse,
                }
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_PLANET_ERROR,
            payload: error.message
        });
    }
};

export const fetchFilmsDetail = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_FILMS_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/films/${id}`);
        const allData = response.data;

        const peopleResponse = response.data.characters.length ? await fetchMultiple(response.data.characters) : 'No related People found';
        const planetsResponse = response.data.planets.length ? await fetchMultiple(response.data.planets) : 'No related Planets found';
        const starshipsResponse = response.data.starships.length ? await fetchMultiple(response.data.starships) : 'No related Starships found';
        const vehiclesResponse = response.data.vehicles.length ? await fetchMultiple(response.data.vehicles) : 'No related Vehicles found';
        const speciesResponse = response.data.species.length ? await fetchMultiple(response.data.species) : 'No related Species found';

        dispatch({
            type: FETCH_FILMS_DETAIL,
            payload: {
                all: {
                    name: allData.title,
                    episode_id: allData.episode_id,
                    director: allData.director,
                    producer: allData.producer,
                    release_date: allData.release_date,
                    opening_crawl: allData.opening_crawl,
                },
                related: {
                    people: peopleResponse,
                    planets: planetsResponse,
                    starships: starshipsResponse,
                    vehicles: vehiclesResponse,
                    species: speciesResponse,
                }
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_FILMS_ERROR,
            payload: error.message
        });
    }
};

export const fetchSpeciesDetail = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_SPECIES_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/species/${id}`);
        const allData = response.data;

        const homeworldResponse = response.data.homeworld && response.data.homeworld.length ? await fetchMultiple([response.data.homeworld]) : 'No related Homeworld found';
        const peopleResponse = response.data.people.length ? await fetchMultiple(response.data.people) : 'No related People found';
        const filmsResponse = response.data.films.length ? await fetchMultiple(response.data.films) : 'No related Films found';

        dispatch({
            type: FETCH_SPECIES_DETAIL,
            payload: {
                all: {
                    name: allData.name,
                    classification: allData.classification,
                    designation: allData.designation,
                    average_height: allData.average_height,
                    skin_colors: allData.skin_colors,
                    hair_colors: allData.hair_colors,
                    eye_colors: allData.eye_colors,
                    average_lifespan: allData.average_lifespan,
                    language: allData.language
                },
                related: {
                    people: peopleResponse,
                    planets: homeworldResponse,
                    films: filmsResponse,
                }
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_SPECIES_ERROR,
            payload: error.message
        });
    }
};

export const fetchVehiclesDetail = (id) => async (dispatch) => {
    dispatch({
        type: FETCH_VEHICLES_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/vehicles/${id}`);
        const allData = response.data;

        const peopleResponse = response.data.pilots.length ? await fetchMultiple(response.data.pilots) : 'No related People found';
        const filmsResponse = response.data.films.length ? await fetchMultiple(response.data.films) : 'No related Films found';

        dispatch({
            type: FETCH_VEHICLES_DETAIL,
            payload: {
                all: {
                    name: allData.name,
                    model: allData.model,
                    manufacturer: allData.manufacturer,
                    cost_in_credits: allData.cost_in_credits,
                    length: allData.length,
                    max_atmosphering_speed: allData.max_atmosphering_speed,
                    crew: allData.crew,
                    passengers: allData.passengers,
                    cargo_capacity: allData.cargo_capacity,
                    consumables: allData.consumables,
                    vehicle_class: allData.vehicle_class
                },
                related: {
                    people: peopleResponse,
                    films: filmsResponse,
                }
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_VEHICLES_ERROR,
            payload: error.message
        });
    }
};

export const fetchStarshipsDetail = (id) => async(dispatch) => {
    dispatch({
        type: FETCH_STARSHIPS_LOADING,
        payload: true
    });
    try {
        const response = await baseAxios.get(`/starships/${id}`);
        const allData = response.data;

        const peopleResponse = response.data.pilots.length ? await fetchMultiple(response.data.pilots) : 'No related People found';
        const filmsResponse = response.data.films.length ? await fetchMultiple(response.data.films) : 'No related Films found';
        
        dispatch({
            type: FETCH_STARSHIPS_DETAIL,
            payload: {
                all: {
                    name: allData.name,
                    model: allData.model,
                    manufacturer: allData.manufacturer,
                    cost_in_credits: allData.cost_in_credits,
                    length: allData.length,
                    max_atmosphering_speed: allData.max_atmosphering_speed,
                    crew: allData.crew,
                    passengers: allData.passengers,
                    cargo_capacity: allData.cargo_capacity,
                    consumables: allData.consumables,
                    hyperdrive_rating: allData.hyperdrive_rating,
                    MGLT: allData.MGLT,
                    starship_class: allData.starship_class,
                },
                related: {
                    people: peopleResponse,
                    films: filmsResponse,
                }
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_STARSHIPS_ERROR,
            payload: error.message
        });
    }
};