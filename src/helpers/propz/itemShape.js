import PropTypes from 'prop-types';

const itemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceperhour: PropTypes.number.isRequired,
  priceperday: PropTypes.number.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
});


export default { itemShape };
