import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSpotsThunk } from "../../store/spots";
import UserSpotCard from "./UserSpotCard";
import "../SpotsList/SpotsList.css";

const UserSpotsList = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);

    useEffect(() => {
        dispatch(userSpotsThunk());
    }, [dispatch])

    if (!spotsArr.length) return null;

    return (
        <div className="spotsList__wrapper">
            {spotsArr.length > 0 && spotsArr.map(spot => (
                <UserSpotCard key={spot.id} spot={spot}/>
            ))}
        </div>
    )
}

export default UserSpotsList;
