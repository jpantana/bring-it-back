import PropTypes from 'prop-types';


const itemsRentedShape = PropTypes.shape({
  hoursRented: PropTypes.string.isRequired,
  pickupDate: PropTypes.string.isRequired,
  overDue: PropTypes.bool.isRequired,
  renterId: PropTypes.string.isRequired,
  ownerAddress: PropTypes.objectOf.isRequired,
  returnTime: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  priceperday: PropTypes.string.isRequired,
  priceperhour: PropTypes.string.isRequired,
});


export default { itemsRentedShape };
