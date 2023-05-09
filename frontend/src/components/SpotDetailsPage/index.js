import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleSpotThunk } from "../../store/spots";
import "./SpotDetailsPage.css";
import { useParams } from "react-router-dom";

const SpotDetailsPage = () => {
    const dispatch = useDispatch();
    const spotId = useParams().spotId;
    const spot = useSelector(state => state.spots.singleSpot);
    console.log('spot', spot);

    useEffect(() => {
        dispatch(singleSpotThunk(spotId))
    }, [dispatch]);

    if (!Object.values(spot).length) return null;

    return (
        <div id="spot-details-wrapper">
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            {spot.SpotImages.length > 0 && spot.SpotImages.map(spotImage => (
                <img src={spotImage.url} alt={spot.name} />
            ))}
            <p>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</p>

        </div>
    );
}

export default SpotDetailsPage;
