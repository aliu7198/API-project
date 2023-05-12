import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { createReviewThunk, getSpotReviewsThunk } from "../../store/reviews";
import { singleSpotThunk } from "../../store/spots";
import StarsInput from "./StarsInput";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ spot }) => {
    const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const user = useSelector(state => state.session.user);
  console.log("🚀 ~ file: index.js:19 ~ CreateReviewModal ~ user:", user)


  useEffect(() => {
      const errors = {};
      if (review.length < 10) errors.review = "Review must have least 10 characters";
      if (!stars) errors.stars = "Review must have at least 1 star";
      setFormErrors(errors);
  }, [review, stars])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const newReview = {
      review,
      stars,
    };

    return dispatch(createReviewThunk(newReview, spot.id, user))
        .then(dispatch(getSpotReviewsThunk(spot.id)))
        .then(closeModal)
        .then(history.push(`/spots/${spot.id}`));

    // const createdReview = await dispatch(createReviewThunk(newReview, spot.id));


    // if (createdReview.errors) {
    //     setValidationErrors(createdReview.errors)
    // } else {
    //     await dispatch(singleSpotThunk(spot.id))
    //     closeModal();
    // }
  };

  const onChange = (number) => {
    setStars(parseInt(number));
  };

//   console.log("🚀 ~ file: index.js:13 ~ CreateReviewModal ~ stars:", stars);

  return (
    <div className="wrapper">
      <h1>How Was Your Stay?</h1>
        {/* {validationErrors} */}
      <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave your review here..."
      />
      {/* STARS */}
      <StarsInput stars={stars} onChange={onChange} />
      {/* button is disabled until 10 char in textarea and star rating has at least 1 star */}
      <button
        type="submit"
        disabled={Object.values(formErrors).length}
        className="create-review-modal__submit-btn"
      >
        Submit Your Review
      </button>
      </form>
    </div>
  );
};

export default CreateReviewModal;
