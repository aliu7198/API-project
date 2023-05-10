import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import "./SpotForm.css";

// reset form when exiting page
// show message under every empty field that is required when "create" is clicked
const SpotForm = ({ spot, formType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  //maybe we should put these in an object/array?
  const [imgURL2, setImgURL2] = useState("");
  const [imgURL3, setImgURL3] = useState("");
  const [imgURL4, setImgURL4] = useState("");
  const [imgURL5, setImgURL5] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (!country) errors.country = "Country is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    if (!previewImage) {
      errors.previewImage = "Preview image is required";
    } else if (
      !(
        previewImage.endsWith(".png") ||
        previewImage.endsWith(".jpg") ||
        previewImage.endsWith(".jpeg")
      )
    ) {
      errors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (
      !(
        imgURL2.endsWith(".png") ||
        imgURL2.endsWith(".jpg") ||
        imgURL2.endsWith(".jpeg")
      )
    ) {
      errors.imgURL2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setValidationErrors(errors);
    // TODO: image errors
  }, [country, address, city, state, description, name, price, previewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    console.log(validationErrors);

    if (Object.values(validationErrors).length) {
      return;
    }

    const newSpot = {
      country,
      address,
      city,
      state,
      name,
      price,
      previewImage,
    };

    console.log(newSpot);

    // do we need to do this?
    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImage("");
    // TODO: reset images state
    setValidationErrors({});
    setHasSubmitted(false);

    // history.push(`/spots/${newSpot.id}`)
  };

  return (
    <div className="spotForm__wrapper">
      <form onSubmit={handleSubmit} className="spotForm__form">
        <h2>Create a new Spot</h2>
        <h3>Where's your place located?</h3>
        <p>
          Guests will only get your exact address once they book a reservation
        </p>
        <div className="spotForm__location spotForm--bottom-border">
          <label htmlFor="country">
            Country
            <span className="errors">
              {hasSubmitted && validationErrors.country}
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
              {hasSubmitted && validationErrors.address}
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
                {hasSubmitted && validationErrors.city}
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
                {hasSubmitted && validationErrors.state}
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
            {hasSubmitted && validationErrors.description}
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
          <div className="errors">{hasSubmitted && validationErrors.name}</div>
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
          <div className="errors">{hasSubmitted && validationErrors.price}</div>
        </div>
        <div className="spotForm__images spotForm--bottom-border">
          <h3>Submit a link to at least one photo to publish your spot</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <div className="errors">
            {hasSubmitted && validationErrors.previewImage}
          </div>
          <input
            type="text"
            value={imgURL2}
            onChange={(e) => setImgURL2(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <div className="errors">
            {hasSubmitted && validationErrors.imgURL2}
          </div>
          <input
            type="text"
            value={imgURL3}
            onChange={(e) => setImgURL3(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <input
            type="text"
            value={imgURL4}
            onChange={(e) => setImgURL4(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <input
            type="text"
            value={imgURL5}
            onChange={(e) => setImgURL5(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default SpotForm;
