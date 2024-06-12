import React from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ items }) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedCity = event.target.value;
    navigate(`/${selectedCity}`);
  };

  const cityOptions = items.map((city, index) => (
    <option key={index} value={city.link}>{city.label}</option>
  ));

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">NOS VILLES</option>
        {cityOptions}
      </select>
    </div>
  );
};

export default Dropdown;





