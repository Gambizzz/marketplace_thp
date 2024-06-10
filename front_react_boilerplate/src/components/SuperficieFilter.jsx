import React from 'react';

const SuperficieFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="superficie">Superficie:</label>
      <input
        type="text"
        id="superficie"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SuperficieFilter; 
