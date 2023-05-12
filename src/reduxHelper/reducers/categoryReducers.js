import { FETCH_PEOPLE_LOADING, FETCH_PEOPLE_SUCCESS, FETCH_PEOPLE_ERROR, FETCH_PEOPLE_DETAIL } from "../service/constants";
import { FETCH_PLANET_LOADING, FETCH_PLANET_SUCCESS, FETCH_PLANET_ERROR, FETCH_PLANET_DETAIL } from "../service/constants";
import { FETCH_FILMS_LOADING, FETCH_FILMS_SUCCESS, FETCH_FILMS_ERROR, FETCH_FILMS_DETAIL } from "../service/constants";
import { FETCH_SPECIES_LOADING, FETCH_SPECIES_SUCCESS, FETCH_SPECIES_ERROR, FETCH_SPECIES_DETAIL } from "../service/constants";
import { FETCH_VEHICLES_LOADING, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_ERROR, FETCH_VEHICLES_DETAIL, } from "../service/constants";
import { FETCH_STARSHIPS_LOADING, FETCH_STARSHIPS_SUCCESS, FETCH_STARSHIPS_ERROR, FETCH_STARSHIPS_DETAIL } from "../service/constants";

export const peopleReducer = (state = { loading: false, data: [], total: 0, error: '', singleData: {} }, action) => {
    switch (action.type) {
        case FETCH_PEOPLE_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case FETCH_PEOPLE_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                total: action.payload.count,
                error: '',
            };
        }
        case FETCH_PEOPLE_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        case FETCH_PEOPLE_DETAIL: {
            return {
                ...state,
                loading: false,
                singleData: action.payload,
                error: ''
            };
        }

        default: return state;
    };
};

export const planetReducer = (state = { loading: false, data: [], total: 0, error: '', singleData: {} }, action) => {
    switch (action.type) {
        case FETCH_PLANET_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case FETCH_PLANET_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                total: action.payload.count,
                error: '',
            };
        }
        case FETCH_PLANET_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        case FETCH_PLANET_DETAIL: {
            return {
                ...state,
                loading: false,
                singleData: action.payload,
                error: ''
            };
        }

        default: return state;
    };
};

export const filmsReducer = (state = { loading: false, data: [], total: 0, error: '', singleData: {} }, action) => {
    switch (action.type) {
        case FETCH_FILMS_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case FETCH_FILMS_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                total: action.payload.count,
                error: '',
            };
        }
        case FETCH_FILMS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        case FETCH_FILMS_DETAIL: {
            return {
                ...state,
                loading: false,
                singleData: action.payload,
                error: ''
            };
        }

        default: return state;
    };
};

export const speciesReducer = (state = { loading: false, data: [], total: 0, error: '', singleData: {} }, action) => {
    switch (action.type) {
        case FETCH_SPECIES_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case FETCH_SPECIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                total: action.payload.count,
                error: '',
            };
        }
        case FETCH_SPECIES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        case FETCH_SPECIES_DETAIL: {
            return {
                ...state,
                loading: false,
                singleData: action.payload,
                error: ''
            };
        }

        default: return state;
    };
};

export const vehiclesReducer = (state = { loading: false, data: [], total: 0, error: '', singleData: {} }, action) => {
    switch (action.type) {
        case FETCH_VEHICLES_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case FETCH_VEHICLES_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                total: action.payload.count,
                error: '',
            };
        }
        case FETCH_VEHICLES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        case FETCH_VEHICLES_DETAIL: {
            return {
                ...state,
                loading: false,
                singleData: action.payload,
                error: ''
            };
        }

        default: return state;
    };
};

export const starshipsReducer = (state = { loading: false, data: [], total: 0, error: '', singleData: {} }, action) => {
    switch (action.type) {
        case FETCH_STARSHIPS_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case FETCH_STARSHIPS_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                total: action.payload.count,
                error: '',
            };
        }
        case FETCH_STARSHIPS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }
        case FETCH_STARSHIPS_DETAIL: {
            return {
                ...state,
                loading: false,
                singleData: action.payload,
                error: ''
            };
        }

        default: return state;
    };
};