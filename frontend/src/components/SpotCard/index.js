const SpotCard = ({ spot }) => {
  console.log(spot);
  return (
    <>
      {/* TODO: preview image */}
      <div>
        <span style={{ fontWeight: "bold" }}>
          {spot.city}, {spot.state}
        </span>
        <span>
          <i class="fa-solid fa-star"></i>
          {`  ${spot.avgRating}`}
        </span>
      </div>
      <p>
        <span style={{ fontWeight: "bold" }}>${spot.price.toFixed(2)}</span> night
      </p>
    </>
  );
};

export default SpotCard;
