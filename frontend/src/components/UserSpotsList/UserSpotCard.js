import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpotThunk } from "../../store/spots";
import "../SpotsList/SpotCard.css";

const UserSpotCard = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(spot);

  // TODO: Make delete modal and move this inside of that component
  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedSpot = await dispatch(deleteSpotThunk(spot.id));

    if (Object.values(deletedSpot).length) {
      history.push('/spots/current');
    }
  }

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
            {+spot.avgRating > 0 ? `  ${spot.avgRating}` : " New"}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>${spot.price.toFixed(2)}</span> night
        </div>
        <div id="spotcard__buttons">
            <Link to={`/spots/${spot.id}/edit`}><button>Update</button></Link>
            {/* TODO: Open Delete Spot Modal on click */}
            <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </Link>
  );
};

export default UserSpotCard;
