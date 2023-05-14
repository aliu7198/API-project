import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import "../SpotsList/SpotCard.css";

const UserSpotCard = ({ spot }) => {
  return (
    <div className="spot-card__wrapper" title={spot.name} >
      <Link to={`/spots/${spot.id}`} style={{ color: "black" }}>
        <img className="spot-card__image"src={spot.previewImage} alt={spot.name} />
        <div className="spot-card__line-1">
          <span style={{ fontWeight: "bold" }}>
            {spot.city}, {spot.state}
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
            {+spot.avgRating > 0 ? `  ${spot.avgRating}` : " New"}
          </span>
        </div>
        <p className="spot-card__price">
          <span style={{ fontWeight: "bold" }}>${Math.round(spot.price*100)/100}</span>{" "}
          night
        </p>
      </Link>
      <div className="spot-card__buttons">
        <Link to={`/spots/${spot.id}/edit`}>
          <button>Update</button>
        </Link>
        <OpenModalButton
          modalComponent={<DeleteSpotModal spot={spot} />}
          buttonText="Delete"
        />
      </div>
    </div>
  );
};

export default UserSpotCard;
