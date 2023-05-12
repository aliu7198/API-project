import { csrfFetch } from "./csrf";
import { singleSpotThunk } from "./spots";

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

export const createReviewThunk = (review, spotId, user) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });
        // TODO: check response body in API docs and add missing keys
        const createdReview = await response.json();
        createdReview.User = user;
        createdReview.ReviewImages = [];
        dispatch(createReviewAction(createdReview));
        dispatch(getSpotReviewsThunk(spotId));
        return createdReview;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}

export const deleteReviewThunk = (reviewId, spotId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        const deletedSpot = await response.json();
        dispatch(deleteReviewAction(reviewId));
        dispatch(singleSpotThunk(spotId));
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
      for (let review of action.reviews) {
        newState.spot[review.id] = review;
      }
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
