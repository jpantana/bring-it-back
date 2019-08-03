
import PropTypes from 'prop-types';
import msgShape from './msgShape';

const messageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(msgShape.msgShape).isRequired,
  username1: PropTypes.string.isRequired,
  userid1: PropTypes.string.isRequired,
  username2: PropTypes.string.isRequired,
  userid2: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
});

export default { messageShape };
