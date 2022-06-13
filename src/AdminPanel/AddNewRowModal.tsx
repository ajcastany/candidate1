import { type } from "@testing-library/user-event/dist/type";
import React, {useState} from "react";
import { Form, Modal, ModalFooter, Button } from "react-bootstrap";
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import ValueType from 'react-select';
//import ValueType from 'react-select';
import {Staff} from '../Data/Staff';


interface AddNewRowProps{
    showModal: boolean,
    closeModal: () => boolean,
}

type StaffOption = {
    label: string, value: number
}
const MOCK_DATA= [{
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

type NameOption = {value: number, label: string}
type NameOptions = Array<NameOption>

function AddNewRowModal(props:AddNewRowProps) {
    const [selectedStaff, setSelectedStaff] = useState("");
    const [selectedStaffID, setSelectedStaffID] = useState(0);

    function onChangeHandler(value: OnChangeValue<StaffOption, false>, actionMeta: ActionMeta<StaffOption>) {
        console.log(value?.value);
        //setSelectedStaffID(value.)
        
    }

    function BuildOptions (data:any[]) {
        var options:NameOptions = []
        data.forEach(element => {
            options.push({
            value: element.id!,
            label: (element.name + ": " + element.department)});
        });
        return options;
    }
    var nameOptions = BuildOptions(MOCK_DATA);
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
                   <Select 
                    options={nameOptions}
                    onChange={onChangeHandler} />
                </Modal.Body>
                <ModalFooter>
                    <Button variant='primary'>Create Entry</Button>
                    <Button variant='danger' onClick={() => props.closeModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
    );
}

export default AddNewRowModal;