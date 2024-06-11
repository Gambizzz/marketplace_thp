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
        <label> Prix Min : </label>
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Prix Max : </label>
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Superficie Min : </label>
        <input
          type="number"
          name="superficieMin"
          value={filters.superficieMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Superficie Max : </label>
        <input
          type="number"
          name="superficieMax"
          value={filters.superficieMax}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Nombre de pièces Min : </label>
        <input
          type="number"
          name="nbDePiecesMin"
          value={filters.nbDePiecesMin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label> Nombre de pièces Max : </label>
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
          name="terasse_jardin"
          value={filters.terasse_jardin}
          onChange={handleChange}
        >
          <option value=""> Choisir </option>
          <option value="true"> Oui </option>
          <option value="false"> Non </option>
        </select>
      </div>
      <button type="submit"> Confirmer </button>
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
    terasse_jardin: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Filter;
