import { useEffect, useState } from "react";

const StarsInput = ({stars, onChange}) => {
    const [activeStars, setActiveStars] = useState(0);

    const starIcon = (number) => {
        const props = {};
        props.onMouseEnter = () => setActiveStars(number);
        props.onMouseLeave = () => setActiveStars(stars);
        props.onClick = () => {
            // console.log("🚀 ~ file: StarsInput.js:20 ~ starIcon ~ stars:", stars)
            // console.log("🚀 ~ file: StarsInput.js:13 ~ starIcon ~ number:", number)
            return onChange(number)
        };
        return (
            <span key={number} {...props}>
                <i className={activeStars >= number ? "fa-solid fa-star fa-2xl" : "fa-regular fa-star fa-2xl"}/>
            </span>
        )
    }


    return (
        <div className="stars-input">
            {[1, 2, 3, 4, 5].map(number => starIcon(number))} Stars
        </div>
    )
}

export default StarsInput;
