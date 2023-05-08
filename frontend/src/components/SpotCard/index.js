import "./SpotCard.css"

const SpotCard = ({ spot }) => {
  console.log(spot);
  return (
    <div id="spotcard-wrapper">
      <img src={spot.previewImage} alt={spot.name}/>
      <div id="line-1">
        <span style={{ fontWeight: "bold" }}>
          {spot.city}, {spot.state}
        </span>
        <span>
          <i class="fa-solid fa-star"></i>
          {spot.avgRating ? `  ${spot.avgRating}` : 'New'}
        </span>
      </div>
      <p>
        <span style={{ fontWeight: "bold" }}>${spot.price.toFixed(2)}</span> night
      </p>
    </div>
  );
};

export default SpotCard;
