import { Button, Modal } from 'react-bootstrap';

const GradeRuleDeleteModal = ({ onDeleteRule, isOpen, onClose, deletingRuleIndex }) => {
  
  const handleConfirmDelete = () => {
    onDeleteRule(deletingRuleIndex);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <h5>Are you sure you want to delete?</h5>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Yes I am sure!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GradeRuleDeleteModal;
