import React, {useState} from "react";
import { Form, Modal, ModalFooter, Button } from "react-bootstrap";


interface AddNewRowProps{
    showModal: boolean,
    closeModal: () => boolean,
}


const MOCK_DATA = [{
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



function AddNewRowModal(props:AddNewRowProps) {
    const [selectedStaff, setSelectedStaff] = useState("");
    const [selectedStaffID, setSelectedStaffID] = useState("");

    function onChangeHandler(e:React.SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        const htmlTarget = e.target as HTMLElement
        console.log(target.getAttribute('id-value'));
        setSelectedStaff(target.value);
        let idValue:string = target.getAttribute('id-value')?.toString() || "";
        setSelectedStaffID(idValue);
        console.log(idValue);
        
    }
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
                            value={selectedStaff}
                            id-value={selectedStaffID}
                            list="namesList"
                            onChange={(e) => onChangeHandler(e)}/>
                        <Form.Label>Department</Form.Label>
                            <Form.Control 
                            name="staffDept"/>
                        <Form.Label>Meeting Room</Form.Label>
                            <Form.Control />
                        <datalist id="namesList">
                           {MOCK_DATA.map( (data) => (
                            <option id={data.id.toString()} key={data.id} value={data.name} label={data.department} id-value={data.id}>{data.name}</option>
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