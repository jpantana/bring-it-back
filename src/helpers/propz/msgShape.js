
import PropTypes from 'prop-types';

const msgShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  otheruserid: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  unread: PropTypes.bool.isRequired,
});

export default { msgShape };
