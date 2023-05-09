import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleSpotThunk } from "../../store/spots";
import "./SpotDetailsPage.css";
import { useParams } from "react-router-dom";

const SpotDetailsPage = () => {
  const dispatch = useDispatch();
  const spotId = useParams().spotId;
  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(singleSpotThunk(spotId));
  }, [dispatch]);
  // needed to include spotId in dependency array according to ESLinter?

  const handleClick = () => {
    // TODO: Booking feature
    return alert("Feature Coming Soon...");
  };

  if (!Object.values(spot).length) return null;

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
        <h1 id="host">
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h1>
        <p id="description">{spot.description}</p>
      </div>
      <div id="detail-card">
        <div>
          <span style={{ fontWeight: "bold"}}>
            ${spot.price.toFixed(2)}
          </span>{" "}
          night
          <span>
            <i className="fa-solid fa-star"></i>
            {spot.avgStarRating ? `  ${spot.avgStarRating}` : "New"} ·{" "}
            {spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
        <button onClick={handleClick}>Reserve</button>
      </div>
    </div>
  );
};

export default SpotDetailsPage;
