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
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getSpotReviewsAction(data.Reviews));
    return data;
  } catch (err) {
    const errors = await err.json();
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
      console.log("🚀 ~ file: reviews.js:36 ~ reviewsReducer ~ newState:", newState)
      for (let review of action.reviews) {
        newState.spot[review.id] = review;
        console.log("🚀 ~ file: reviews.js:36 ~ reviewsReducer ~ newStateINSIDE:", newState)
      }
      console.log("🚀 ~ file: reviews.js:36 ~ reviewsReducer ~ newStateFINAL:", newState)
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
