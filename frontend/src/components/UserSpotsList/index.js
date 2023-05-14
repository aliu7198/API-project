import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSpotsThunk } from "../../store/spots";
import UserSpotCard from "./UserSpotCard";
import "../SpotsList/SpotsList.css";
import "./UserSpotsList.css";

const UserSpotsList = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spotsArr = Object.values(spotsObj);

  useEffect(() => {
    dispatch(userSpotsThunk());
  }, [dispatch]);

  return (
    <div className="user-spots__wrapper">
      <h1>Manage Your Spots</h1>
      <Link to="/spots/new">
        <button className="user-spots__create-spot-btn">
          Create a New Spot
        </button>
      </Link>
      <div className="spotsList__list-wrapper">
        {spotsArr.length > 0 &&
          spotsArr.map((spot) => <UserSpotCard key={spot.id} spot={spot} />)}
      </div>
    </div>
  );
};

export default UserSpotsList;
