import { Button, Modal } from 'react-bootstrap';

const GradeRuleDeleteModal = ({ onDeleteRule, isOpen, onClose, deletingRuleIndex, isDeleteAll, deleteAll }) => {
  
  const handleConfirmDelete = (isDeleteAll) => {
    if(isDeleteAll){
        deleteAll();
    }
    else {
      onDeleteRule(deletingRuleIndex);
    }
    onClose();
  };

  let message = isDeleteAll ? (<h5>Are you sure you want to delete all grading criteria?</h5>) : (<h5>Are you sure you want to delete?</h5>);

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {message}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleConfirmDelete(isDeleteAll)}>
          Yes I am sure!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GradeRuleDeleteModal;
