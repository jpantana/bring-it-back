
import PropTypes from 'prop-types';

const messageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  newMessage: PropTypes.string.isRequired,
  username1: PropTypes.string.isRequired,
  userid1: PropTypes.string.isRequired,
  username2: PropTypes.string.isRequired,
  userid2: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
});

export default { messageShape };
