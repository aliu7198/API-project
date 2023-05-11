import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateSpotThunk } from "../../store/spots";
import "./SpotForm.css";

const UpdateSpotForm = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { spotId } = useParams();

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setHasSubmitted(true);

    const spot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    const newSpot = await dispatch(updateSpotThunk(spot, spotId));

    if (newSpot.errors) {
      setValidationErrors(newSpot.errors);
    } else {
      history.push(`/spots/${newSpot.id}`);
    }
  };

  if (!Object.values(spot).length) return null;

  return (
    <div className="spotForm__wrapper">
      <form onSubmit={handleSubmit} className="spotForm__form">
        <h2>Update your Spot</h2>
        <h3>Where's your place located?</h3>
        <p>
          Guests will only get your exact address once they book a reservation
        </p>
        <div className="spotForm__location spotForm--bottom-border">
          <label htmlFor="country">
            Country
            <span className="errors">
              {hasSubmitted && validationErrors?.country}
            </span>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="spotForm__input"
            />
          </label>
          <label htmlFor="address">
            Street Address
            <span className="errors">
              {hasSubmitted && validationErrors?.address}
            </span>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street Address"
              className="spotForm__input"
            />
          </label>
          <div id="city-state-wrapper">
            <label htmlFor="city">
              City
              <span className="errors">
                {hasSubmitted && validationErrors?.city}
              </span>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="spotForm__input"
              />
            </label>
            <div>, </div>
            <label htmlFor="state">
              State
              <span className="errors">
                {hasSubmitted && validationErrors?.state}
              </span>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="STATE"
                className="spotForm__input"
              />
            </label>
          </div>
        </div>
        <div className="spotForm__description spotForm--bottom-border">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
            className="spotForm__textarea"
          />
          <div className="errors">
            {hasSubmitted && validationErrors?.description}
          </div>
        </div>
        <div className="spotForm__title spotForm--bottom-border">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
            className="spotForm__input"
          />
          <div className="errors">{hasSubmitted && validationErrors?.name}</div>
        </div>
        <div className="spotForm__price spotForm--bottom-border">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div id="price-wrapper">
            <span>$</span>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            />
          </div>
          <div className="errors">
            {hasSubmitted && validationErrors?.price}
          </div>
        </div>
        {/* BONUS TODO: update spot images */}
        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
};

export default UpdateSpotForm;
