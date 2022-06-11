import React from "react";
import { Form, Modal, ModalFooter, Button } from "react-bootstrap";

interface AddNewRowProps{
    showModal: boolean,
    closeModal: () => boolean,
}

const MOCK_STAFF = [{
    id: 1,
    name: "jhon stephen",
    department: "HR"
}, {
    id: 2,
    name: "Jane rogers",
    department: "Research"
}, {
    id: 3,
    name: "Elizabeth meyer",
    department: "Facilities"
}

]

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
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>    
                            <Form.Control 
                            list="namesList"/>
                        <Form.Label>Department</Form.Label>
                            <Form.Control />
                        <Form.Label>Meeting Room</Form.Label>
                            <Form.Control />
                        <datalist id="namesList">
                            <option data-value="1">one</option>
                            <option data-value='2'>two</option>
                            <option>three</option>
                            <option>four</option>
                        </datalist>
                    </Form.Group>
                </Modal.Body>
                <ModalFooter>
                    <Button variant='primary'>Create Entry</Button>
                    <Button variant='danger' onClick={() => props.closeModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
    );
}

export default AddNewRowModal;