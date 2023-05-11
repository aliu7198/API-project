import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/allSpots"
const GET_SINGLE_SPOT = "spots/singleSpot";
const GET_USER_SPOTS = "spots/userSpots";
const CREATE_SPOT = "spots/createSpot";
const CREATE_SPOT_IMAGE = "spots/createSpotImage";

/*****************************************************************************/

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

const userSpotsAction = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots
    }
}

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

/*****************************************************************************/

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

export const userSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(userSpotsAction(data));
        return data;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const createSpotThunk = (spot, user) => async dispatch => {
    try {
        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        });
        const createdSpot = await response.json();
        // need to create missing keys compared to get single spot res body
        createdSpot.SpotImages = [];
        createdSpot.numReviews = 0;
        createdSpot.avgStarRating = 0;
        createdSpot.Owner = user;
        console.log(createdSpot);
        return dispatch(createSpotImagesThunk(createdSpot, spot.imageObjects)); // doesn't touch reducer
    } catch (err) { // err is the response object if status code >= 400
        const errors = await err.json();
        return errors;
    }
}

// create images thunk - accept createdSpot and images array from action param
// accept an array of images
// for loop to fetch all images
// dispatch to create spot

export const createSpotImagesThunk = (createdSpot, images) => async dispatch => {
    console.log('images', images);
    for (let image of images) {
        const response = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(image)
        });
        const createdSpotImage = await response.json();
        createdSpot.SpotImages.push(createdSpotImage);
    }
    dispatch(createSpotAction(createdSpot)); // does touch reducer
    return createdSpot;
}

/*****************************************************************************/

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
        case GET_USER_SPOTS: {
            newState = {...state, allSpots: {}, singleSpot: {}}
            newState.allSpots = action.spots.Spots
            return newState;
        }
        case CREATE_SPOT: {
            newState = {...state, allSpots: {}, singleSpot: {}}
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer;
