import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import { singleSpotThunk } from "../../store/spots";
import StarsInput from "./StarsInput";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = {};
    if (review.length < 10)
      errors.review = "Review must have least 10 characters";
    if (!stars) errors.stars = "Review must have at least 1 star";
    setFormErrors(errors);
  }, [review, stars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});

    const newReview = {
      review,
      stars,
    };

    return dispatch(createReviewThunk(newReview, spot.id, user))
      .then(dispatch(singleSpotThunk(spot.id)))
      .then(closeModal);
  };

  const onChange = (number) => {
    setStars(parseInt(number));
  };

  return (
    <div className="create-review__wrapper">
      <h2>How Was Your Stay?</h2>
      {validationErrors.message && (
        <p className="errors">{validationErrors.message}</p>
      )}
      <form onSubmit={handleSubmit} className="create-review__form">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
          className="create-review__textarea"
        />
        <StarsInput stars={stars} onChange={onChange} />
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
