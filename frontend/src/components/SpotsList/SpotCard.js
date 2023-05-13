import { Link } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`} style={{ color: "black" }}>
      <div className="spot-card__wrapper" title={spot.name} >
        <img className="spot-card__image" src={spot.previewImage} alt={spot.name} />
        <div className="spot-card__line-1">
          <span style={{ fontWeight: "bold" }}>
            {spot.city}, {spot.state}
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
            {+spot.avgRating > 0 ? `  ${spot.avgRating}` : " New"}
          </span>
        </div>
        <p className='spot-card__price'>
          <span style={{ fontWeight: "bold" }}>${spot.price.toFixed(2)}</span> night
        </p>
      </div>
    </Link>
  );
};

export default SpotCard;
