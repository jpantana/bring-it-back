import PropTypes from 'prop-types';

const categoriesShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});

export default { categoriesShape };
