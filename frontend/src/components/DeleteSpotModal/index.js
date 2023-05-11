import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpotModal.css";

const DeleteSpotModal = ({spot}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteSpotThunk(spot.id))
        .then(closeModal)
  };

  return (
    <div className="wrapper">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <button onClick={handleDelete} className="delete-spot-modal__yes-btn">Yes (Delete Spot)</button>
        <button onClick={closeModal} className="delete-spot-modal__no-btn">No (Keep Spot)</button>
    </div>
  )
};

export default DeleteSpotModal;
