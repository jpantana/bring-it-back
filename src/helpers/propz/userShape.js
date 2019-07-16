import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
});

export default { userShape };
