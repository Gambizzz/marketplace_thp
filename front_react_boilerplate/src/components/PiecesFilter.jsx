import React from 'react';

const PiecesFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="pieces">Nombre de pièces:</label>
      <input
        type="text"
        id="pieces"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PiecesFilter;
