import PropTypes from 'prop-types';

const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prix Min:</label>
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Prix Max:</label>
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Superficie Min:</label>
        <input
          type="number"
          name="superficieMin"
          value={filters.superficieMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Superficie Max:</label>
        <input
          type="number"
          name="superficieMax"
          value={filters.superficieMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Meublé:</label>
        <select
          name="meuble"
          value={filters.meuble}
          onChange={handleChange}
        >
          <option value="">--Choisir--</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

Filter.propTypes = {
  filters: PropTypes.shape({
    priceMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    priceMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    superficieMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    superficieMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    meuble: PropTypes.string,
    localisation: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Filter;
