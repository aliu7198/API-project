import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { singleSpotThunk } from "../../store/spots";
import { deleteReviewThunk } from "../../store/reviews";
import "./DeleteReviewModal.css";

const DeleteReviewModal = ({review, spotId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteReviewThunk(review.id, spotId))
        .then(dispatch(singleSpotThunk(spotId)))
        .then(closeModal)
  };

  return (
    <div className="wrapper">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <button onClick={handleDelete} className="delete-spot-modal__yes-btn">Yes (Delete Review)</button>
        <button onClick={closeModal} className="delete-spot-modal__no-btn">No (Keep Review)</button>
    </div>
  )
};

export default DeleteReviewModal;
