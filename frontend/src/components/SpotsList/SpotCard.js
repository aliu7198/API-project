import { Link } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`} style={{ color: "black" }}>
      <div id="spotcard-wrapper">
        <img src={spot.previewImage} alt={spot.name} />
        <div id="line-1">
          <span style={{ fontWeight: "bold" }}>
            {spot.city}, {spot.state}
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
            {spot.avgRating ? `  ${spot.avgRating}` : "New"}
          </span>
        </div>
        <p>
          <span style={{ fontWeight: "bold" }}>${spot.price.toFixed(2)}</span> night
        </p>
      </div>
    </Link>
  );
};

export default SpotCard;
