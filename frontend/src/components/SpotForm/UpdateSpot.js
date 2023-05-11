import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleSpotThunk } from "../../store/spots";
import UpdateSpotForm from "./UpdateSpotForm";

// another option: put everything in a wrapper
// useSelector inside wrapper
// useEffect for useStates
// conditionally render form if spot is prepopulated
// if spot exists, return form - if not, return null

const UpdateSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(singleSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!Object.values(spot).length) return <div>Loading...</div>;
  return <UpdateSpotForm spot={spot} />;
};

export default UpdateSpot;
