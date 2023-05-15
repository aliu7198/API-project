import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { singleSpotThunk } from "../../store/spots";
import { deleteReviewThunk } from "../../store/reviews";
import "./DeleteModal.css";

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
    <div className="modal__wrapper">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <button onClick={handleDelete} className="delete-modal__yes-btn">Yes (Delete Review)</button>
        <button onClick={closeModal} className="delete-modal__no-btn">No (Keep Review)</button>
    </div>
  )
};

export default DeleteReviewModal;
