import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotForm from ".";
import { singleSpotThunk } from "../../store/spots";

const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const spotId = useParams().spotId;
  const spot = useSelector((state) => state.spots.singleSpot);
  console.log('spot', spot);

  useEffect(() => {
    dispatch(singleSpotThunk(spotId));
  }, [dispatch, spotId]);
  return <SpotForm spot={spot} formType="Update Spot" />;
};

export default UpdateSpotForm;
