import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return dispatch(createReviewThunk(spot.id))
    //     .then(closeModal)
  };

  return (
    <div className="wrapper">
      <h1>How Was Your Stay?</h1>
      <textarea placeholder="Leave your review here..." />
      {/* STARS */}
      {/* button is disabled until 10 char in textarea and star rating has at least 1 star */}
      <button onClick={handleSubmit} className="delete-spot-modal__yes-btn">
        Submit Your Review
      </button>
    </div>
  );
};

export default CreateReviewModal;
