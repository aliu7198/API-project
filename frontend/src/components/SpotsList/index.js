import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpotsThunk } from "../../store/spots";
import "./SpotsList.css";

const SpotsList = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);
    console.log(spotsArr);

    useEffect(() => {
        dispatch(allSpotsThunk());
    }, [dispatch])

    return (
        <>
            {spotsArr.length > 0 && spotsArr.map(spot => (
                <>
                    {/* TODO: spot card */}
                </>
            ))}
        </>
    )
}

export default SpotsList;
