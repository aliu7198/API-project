import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk, getSpotReviewsThunk } from "../../store/reviews";
import StarsInput from "./StarsInput";
import "./CreateReviewModal.css";
import { singleSpotThunk } from "../../store/spots";

const CreateReviewModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const errors = {};
    if (review.length < 10) errors.review = "Review must have least 10 characters";
    if (!stars) errors.stars = "Review must have at least 1 star";
    setFormErrors(errors);
  }, [review, stars])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    };

    const createdReview = await dispatch(createReviewThunk(newReview, spot.id));

    if (createdReview.errors) {
        setValidationErrors(createdReview.errors)
    } else {
        await dispatch(singleSpotThunk(spot.id))
        closeModal();
    }
  };

  const onChange = (number) => {
    setStars(parseInt(number));
  };

//   console.log("🚀 ~ file: index.js:13 ~ CreateReviewModal ~ stars:", stars);

  return (
    <div className="wrapper">
      <h1>How Was Your Stay?</h1>
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
        className="create-review-modal__submit-btn"
      >
        Submit Your Review
      </button>
      </form>
    </div>
  );
};

export default CreateReviewModal;
