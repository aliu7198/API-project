import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleSpotThunk } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import SpotReviews from "./SpotReviews";
import "./SpotDetailsPage.css";

const SpotDetailsPage = () => {
  const dispatch = useDispatch();
  const spotId = useParams().spotId;
  const spot = useSelector((state) => state.spots.singleSpot);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.spot);
  const reviewsArr = Object.values(reviews);

  let userReview;
  if (user) {
    userReview = reviewsArr.find((review) => review.User.id === user.id);
  }

  useEffect(() => {
    dispatch(singleSpotThunk(spotId));
  }, [dispatch]);

  const handleClick = () => {
    // TODO: Booking feature
    return alert("Feature Coming Soon...");
  };

  if (!Object.values(spot).length) return <div>Loading...</div>;

  return (
    <div id="spot-details-wrapper">
      <h1>{spot.name}</h1>
      <p>
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div id="img-wrapper">
        {spot.SpotImages.length > 0 &&
          spot.SpotImages.map((spotImage) => (
            <img key={spotImage.id} src={spotImage.url} alt={spot.name} />
          ))}
      </div>
      <div id="text-wrapper">
        <h2 id="host">
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h2>
        <p id="description">{spot.description}</p>
      </div>
      <div id="detail-card">
        <div>
          <span style={{ fontWeight: "bold" }}>${spot.price.toFixed(2)}</span>{" "}
          night
          <span>
            <i className="fa-solid fa-star"></i>
            {+spot.avgStarRating > 0
              ? `  ${spot.avgStarRating}`
              : " New"} · {spot.numReviews}{" "}
            {spot.numReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
        <button onClick={handleClick}>Reserve</button>
      </div>
      {/* button shouldn't show if user not logged in
      if spot doesn't belong to user and and user didn't post a review already
      if (!reviewsArr.length) {
        return (
          <>
          <button>Post Your Review</button>
          </>
          );
          } */}
      <div className="spot-details__reviews-wrapper">
        <h2 className="spot-details__rating-reviews">
          <i className="fa-solid fa-star"></i>
          {+spot.avgStarRating > 0 ? `  ${spot.avgStarRating}` : " New"}
          {spot.numReviews ? <span id="dot">·</span> : ""}{" "}
          {spot.numReviews ? (
            <span>
              {spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}
            </span>
          ) : (
            ""
          )}
        </h2>
        <div className="spot-details__post-review-btn">
          {user && !userReview && user.id !== spot.Owner.id ? (
            <OpenModalButton modalComponent={<CreateReviewModal spot={spot} />} buttonText="Post Your Review" />
          ) : (
            <div></div>
          )}
        </div>
        <SpotReviews spotId={spotId} />
      </div>
    </div>
  );
};

export default SpotDetailsPage;
