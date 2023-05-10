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
        imgURL2: "",
        imgURL3: "",
        imgURL4: "",
        imgURL5: "",
    }
    return (
        <SpotForm spot={spot} formType="Create Spot" />
    )
}

export default CreateSpotForm;
