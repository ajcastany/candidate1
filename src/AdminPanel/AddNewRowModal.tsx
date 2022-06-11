import React from "react";
import { Modal } from "react-bootstrap";

interface AddNewRowProps{
    showModal: boolean,
    closeModal: () => boolean,
}

function AddNewRowModal(props:AddNewRowProps) {


    return (
        <Modal
            show={props.showModal}
            backdrop="static"
            keyboard={false}
            onHide={() => props.closeModal()} >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
            </Modal>
    );
}

export default AddNewRowModal;