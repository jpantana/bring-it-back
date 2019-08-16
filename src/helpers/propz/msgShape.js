
import PropTypes from 'prop-types';

const msgShape = PropTypes.shape({
  senderid: PropTypes.string.isRequired,
  receiverid: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  unread: PropTypes.bool.isRequired,
  itemOwnerId: PropTypes.string.isRequired,
});

export default { msgShape };
