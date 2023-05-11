import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import "./SpotForm.css";

// reset form when exiting page
// show message under every empty field that is required when "create" is clicked
const CreateSpotForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [previewImage, setPreviewImage] = useState("");
  const [imgURL2, setImgURL2] = useState("");
  const [imgURL3, setImgURL3] = useState("");
  const [imgURL4, setImgURL4] = useState("");
  const [imgURL5, setImgURL5] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [validImageURLs, setValidImageURLs] = useState({});
  const images = { previewImage, imgURL2, imgURL3, imgURL4, imgURL5 };

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    const validImages = {};
    if (!previewImage) {
      errors.previewImage = "Preview image is required";
    }

    for (let key in images) {
      const url = images[key];
      if (
        url &&
        !(url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg"))
      ) {
        errors[`${key}`] = "Image URL must end in .png, .jpg, or .jpeg";
      } else if (url) {
        validImages[`${key}`] = url;
      }
    }

    setValidImageURLs(validImages);
    setImageErrors(errors);
  }, [previewImage, imgURL2, imgURL3, imgURL4, imgURL5]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setHasSubmitted(true);

    const imageObjects = [];
    for (let key in validImageURLs) {
      const img = validImageURLs[key];
      if (key === "previewImage") {
        imageObjects.push({
          url: img,
          preview: true,
        });
      } else {
        imageObjects.push({
          url: img,
          preview: false,
        });
      }
    }

    const spot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      imageObjects,
    };

    let newSpot;
    if (!Object.values(imageErrors).length) {
        newSpot = await dispatch(createSpotThunk(spot, user));
    }

    // if no errors in newSpot and no values in
    if (!newSpot.errors && !Object.values(imageErrors).length) {
      setCountry("");
      setAddress("");
      setCity("");
      setState("");
      setDescription("");
      setName("");
      setPrice("");
      setPreviewImage("");
      setImgURL2("");
      setImgURL3("");
      setImgURL4("");
      setImgURL5("");
      setValidationErrors({});
      setHasSubmitted(false);
      history.push(`/spots/${newSpot.id}`);
    } else {
      setValidationErrors(newSpot.errors);
    }
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
          <div className="errors">{hasSubmitted && validationErrors?.price}</div>
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
            {hasSubmitted && imageErrors?.previewImage}
          </div>
          <input
            type="text"
            value={imgURL2}
            onChange={(e) => setImgURL2(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <div className="errors">{hasSubmitted && imageErrors?.imgURL2}</div>
          <input
            type="text"
            value={imgURL3}
            onChange={(e) => setImgURL3(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <div className="errors">{hasSubmitted && imageErrors?.imgURL3}</div>
          <input
            type="text"
            value={imgURL4}
            onChange={(e) => setImgURL4(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <div className="errors">{hasSubmitted && imageErrors?.imgURL4}</div>
          <input
            type="text"
            value={imgURL5}
            onChange={(e) => setImgURL5(e.target.value)}
            placeholder="Image URL"
            className="spotForm__input--bottom-margin"
          />
          <div className="errors">{hasSubmitted && imageErrors?.imgURL5}</div>
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
