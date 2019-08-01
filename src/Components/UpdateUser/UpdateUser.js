import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap';
// JSs
import userShape from '../../helpers/propz/userShape';

class UpdateUser extends React.Component {
  static propTypes = {
    user: userShape.userShape,
    openModal: PropTypes.func.isRequired,
    modal: PropTypes.bool.isRequired,
  }

  callOpenModal = (e) => {
    e.preventDefault();
    this.props.openModal(e);
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} >
          <ModalHeader>Update Your Profile</ModalHeader>
            <ModalBody>

            <Button>Save</Button>
            <Button onClick={this.callOpenModal} >Cancel</Button>
            </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateUser;
