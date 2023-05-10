import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/allSpots"
const GET_SINGLE_SPOT = "spots/singleSpot";
const CREATE_SPOT = "spots/createSpot";
const CREATE_SPOT_IMAGE = "spots/createSpotImage";

// create images thunk - accept createdSpot and images array from action param
// accept an array of images
// for loop to fetch all images
// dispatch to create spot
// maybe DM daniel about this??

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

const createSpotAction = spot => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const createSpotImageAction = image => {
    return {
        type: CREATE_SPOT_IMAGE,
        image
    }
}

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

export const createSpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const createdSpot = await response.json();
        dispatch(createSpotAction(createdSpot))
        return createdSpot;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const createSpotImagesThunk = (createdSpot, images) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(images)
    });

    if (response.ok) {
        // this is an object
        const createdSpotImages = await response.json();
        dispatch(createSpotImageAction(createdSpotImages));
        return createdSpotImages;
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
            newState = {...state, allSpots: {}, singleSpot: {}}
            action.spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;
        }
        case GET_SINGLE_SPOT: {
            newState = {...state, allSpots: {}, singleSpot: {}}
            newState.singleSpot = action.spotId
            return newState;
        }
        case CREATE_SPOT: {
            newState = {...state, allSpots: {}, singleSpot: {}}
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        case CREATE_SPOT_IMAGE: {
            newState = {...state, allSpots: {}, singleSpot: {...state.singleSpot, SpotImages: []}}
            newState.singleSpot.SpotImages[action.image.id] = action.image
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer;
