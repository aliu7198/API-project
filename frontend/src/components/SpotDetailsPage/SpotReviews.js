import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviewsThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { singleSpotThunk } from "../../store/spots";
// import { singleSpotThunk } from "../../store/spots";

const SpotReviews = ({ spotId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => state.reviews.spot);
  const user = useSelector((state) => state.session.user);
  const reviewsArr = Object.values(reviewsObj).reverse();

//   const [isLoading, setIsLoading] = useState(true);

//   let spotReviews;
  useEffect(() => {
    // dispatch(singleSpotThunk(spotId));
    dispatch(getSpotReviewsThunk(spotId));

    // DO I NEED THIS??
    dispatch(singleSpotThunk(spotId));

    // console.log("🚀 ~ file: SpotReviews.js:33 ~ useEffect ~ spotReviews:", spotReviews)

    // if (spotReviews.errors) {
    //   reviewsArr = [];
    //   history.push(`/spots/${spotId}`);
    // }
    // setIsLoading(false);
  }, [dispatch, spotId]);


  const _reviewDate = (createdAt) => {
    const dateArr = new Date(createdAt).toString().split(" ");
    const res = `${dateArr[1]} ${dateArr[3]}`;
    return res;
  };

//   if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="reviews__wrapper">
        {reviewsArr.length ? (
          <div>
            {reviewsArr.map((review) => (
              <div key={review.id} className="reviews__review">
                <h3>{review.User.firstName}</h3>
                <p id="date">{_reviewDate(review.createdAt)}</p>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>Be the first to post a review!</div>
        )}
      </div>
    );
  }

  return (
    <div className="reviews__wrapper">
      {reviewsArr.length ? (
        <div>
          {reviewsArr.map((review) => (
            <div key={review.id} className="reviews__review">
              <h3>{review.User.firstName}</h3>
              <p id="date">{_reviewDate(review.createdAt)}</p>
              <p>{review.review}</p>
              {user.id === review.User.id ? (
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteReviewModal review={review} spotId={spotId} />
                  }
                />
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>Be the first to post a review!</div>
      )}
    </div>
  );
};

export default SpotReviews;
