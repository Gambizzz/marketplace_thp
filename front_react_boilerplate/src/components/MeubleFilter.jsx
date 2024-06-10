import React from 'react';

const MeubleFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="meuble">Meublé:</label>
      <select id="meuble" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Tous</option>
        <option value="meuble">Meublé</option>
        <option value="non-meuble">Non meublé</option>
      </select>
    </div>
  );
};

export default MeubleFilter;
