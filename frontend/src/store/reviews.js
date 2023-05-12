import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/getSpotReviews";
const CREATE_REVIEW = "reviews/createReview";
const DELETE_REVIEW = "reviews/deleteReview";

/*****************************************************************************/

const getSpotReviewsAction = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
  };
};

const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

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

export const createReviewThunk = (review, spotId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        const createdReview = await response.json();
        dispatch(createReviewAction(createdReview));
        return createdReview;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        const deletedSpot = await response.json();
        dispatch(deleteReviewAction(reviewId));
        return deletedSpot;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

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
    case CREATE_REVIEW: {
        newState = {...state, spot: {}, user: {}}
        newState.spot[action.review.id] = action.review
        return newState
    }
    case DELETE_REVIEW: {
        newState = {...state, spot: {...state.spot}}
        delete newState.spot[action.reviewId]
        return newState
    }
    default:
      return state;
  }
};

export default reviewsReducer;
