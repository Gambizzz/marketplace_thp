import React from 'react';

const TerrasseFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="terrasse">Terrasse:</label>
      <select id="terrasse" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Tous</option>
        <option value="oui">Oui</option>
        <option value="non">Non</option>
      </select>
    </div>
  );
};

export default TerrasseFilter;
