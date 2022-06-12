import React from "react";
import { Form, Modal, ModalFooter, Button } from "react-bootstrap";
import { MOCK_DATA } from "../Data/TEST/MockStaff";

interface AddNewRowProps{
    showModal: boolean,
    closeModal: () => boolean,
}

const MOCK_STAFF = [{
    id: 1,
    name: "Jhon Doe",
    department: "HR"
}, {
    id: 2,
    name: "Jane Doe",
    department: "Research"
}, {
    id: 3,
    name: "Elizabeth meyer",
    department: "Operations"
}]

function onChangeHandler(e:React.SyntheticEvent) {
    
    console.log(e.target);
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
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>    
                            <Form.Control
                            name="staffName"
                            data-value={0}
                            list="namesList"
                            onChange={(e) => onChangeHandler(e)}/>
                        <Form.Label>Department</Form.Label>
                            <Form.Control 
                            name="staffDept"/>
                        <Form.Label>Meeting Room</Form.Label>
                            <Form.Control />
                        <datalist id="namesList">
                           {MOCK_DATA.map( (data) => (
                            <option key={data.id} value={data.name} data-value={data.department}></option>
                           ))}
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