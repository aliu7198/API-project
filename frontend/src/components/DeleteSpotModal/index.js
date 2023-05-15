import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import "../DeleteReviewModal/DeleteModal.css";

const DeleteSpotModal = ({spot}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteSpotThunk(spot.id))
        .then(closeModal)
  };

  return (
    <div className="modal__wrapper">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <button onClick={handleDelete} className="delete-modal__yes-btn">Yes (Delete Spot)</button>
        <button onClick={closeModal} className="delete-modal__no-btn">No (Keep Spot)</button>
    </div>
  )
};

export default DeleteSpotModal;
