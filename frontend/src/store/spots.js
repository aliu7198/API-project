import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/allSpots"
const GET_SINGLE_SPOT = "spots/singleSpot";

const allSpotsAction = spots => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
};

const singleSpotAction = spotId => {
    return {
        type: GET_SINGLE_SPOT,
        spotId
    }
};

export const allSpotsThunk = () => async dispatch => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const data = await response.json();
        dispatch(allSpotsAction(data.Spots));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const singleSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(singleSpotAction(data))
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = {allSpots: {}, singleSpot: {}}
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALL_SPOTS: {
            newState = {...state, allSpots: {...state.allSpots}, singleSpot: {}}
            action.spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;
        }
        case GET_SINGLE_SPOT: {
            newState = {...state, allSpots: {}, singleSpot: {...action.spotId}}
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
