import "./SpotImages.css";

const SpotImages = ({ spot }) => {
  const previewImage = spot.SpotImages.find((image) => image.preview === true);
  const otherImages = spot.SpotImages.filter(
    (image) => image.preview === false
  );

  return (
    // <div className="spot-images__wrapper">
    //   <div className="spot-images__preview-image">
    //     <img id="preview-image" src={previewImage.url} alt={spot.name} />
    //   </div>
    //   <div className="spot-images__other-images">
    //     {otherImages.length > 0 &&
    //       otherImages.map((spotImage) => (
    //         <img key={spotImage.id} src={spotImage.url} alt={spot.name} id="other-image"/>
    //       ))}
    //   </div>
    // </div>
    <div className="spot-images__wrapper">
      <img id="preview-image" src={previewImage.url} alt={spot.name} />
      {otherImages.length > 0 &&
        otherImages.map((spotImage) => (
          <img
            key={spotImage.id}
            src={spotImage.url}
            alt={spot.name}
            id={`image-${otherImages.indexOf(spotImage)}`}
          />
        ))}
    </div>
  );
};

export default SpotImages;
