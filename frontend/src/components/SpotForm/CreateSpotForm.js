import SpotForm from "."

const CreateSpotForm = () => {
    const spot = {
        country: "",
        address: "",
        city: "",
        state: "",
        name: "",
        price: "",
        previewImage: "",
    }
    return (
        <SpotForm spot={spot} formType="Create Spot" />
    )
}

export default CreateSpotForm;
