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
    <form onSubmit={handleSubmit} className='form-filters'>
      <div>
        <label> Prix min. : </label>
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Prix max. : </label>
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Superficie min. : </label>
        <input
          type="number"
          name="superficieMin"
          value={filters.superficieMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Superficie max. : </label>
        <input
          type="number"
          name="superficieMax"
          value={filters.superficieMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Nbr de pièces min. : </label>
        <input
          type="number"
          name="nbDePiecesMin"
          value={filters.nbDePiecesMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Nbr de pièces max. : </label>
        <input
          type="number"
          name="nbDePiecesMax"
          value={filters.nbDePiecesMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Terrasse/Jardin </label>
        <select
          name="terrasse_jardin"
          value={filters.terrasse_jardin}
          onChange={handleChange}
        >
          <option value=""> Choisir </option>
          <option value="true"> Oui </option>
          <option value="false"> Non </option>
        </select>
      </div>
    </form>
  );
};

Filter.propTypes = {
  filters: PropTypes.shape({
    priceMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    priceMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    superficieMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    superficieMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nbDePiecesMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nbDePiecesMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    terrasse_jardin: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Filter;
