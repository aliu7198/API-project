import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";

/*****************************************************************************/

const getSpotReviewsAction = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
  };
};

/*****************************************************************************/

export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotReviewsAction(data.Reviews));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

/*****************************************************************************/

const initialState = { spot: {}, user: {} };
const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOT_REVIEWS: {
      newState = { ...state, spot: {}, user: {} };
      for (let review of action.reviews) {
        newState.spot[review.id] = review;
      }
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
