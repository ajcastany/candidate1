import { type } from "@testing-library/user-event/dist/type";
import React, {useState} from "react";
import { Form, Modal, ModalFooter, Button } from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";
import Select, { ActionMeta, OnChangeValue, OptionContext } from 'react-select';
import { FormatOptionLabelMeta } from "react-select/dist/declarations/src/Select";
//import ValueType from 'react-select';
import {Staff} from '../Data/Staff';


interface AddNewRowProps{
    showModal: boolean,
    closeModal: () => boolean,
}

type StaffOption = {
    label: string, value: number, department: string
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

//type NameOption = {value: number, label: string, department: string}
//type NameOptions = Array<NameOption>

function AddNewRowModal(props:AddNewRowProps) {
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedStaffID, setSelectedStaffID] = useState(0);

    function onChangeHandler(value: OnChangeValue<StaffOption, false>, actionMeta: ActionMeta<StaffOption>) {
        console.log(value);
        if (value?.value !== undefined) {
            setSelectedStaffID(value.value!);
            setSelectedDept(value.department);
        }
        
        
    }

    function BuildOptions (data:any[]) {
        var options:StaffOption[] = []
        data.forEach(element => {
            options.push({
            value: element.id!,
            label: element.name,
            department: element.department})
        });
        return options;
    }
    var nameOptions = BuildOptions(MOCK_DATA);

    const formatOption = (option:StaffOption, 
        formatOptionLabelMeta:FormatOptionLabelMeta<StaffOption>) => {
        //return ( context === 'menu' ? option.label : option.label);
        return (<div></div>)
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
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Select
                                options={nameOptions}
                                onChange={onChangeHandler}
                                formatOptionLabel={(option, {context}) => {
                                    return context==='menu' ? option.label + ": " + option.department : option.label;
                                }} 
                                getOptionValue={(option) => option.label}
                            />

                        <Form.Label>
                            Department
                        </Form.Label>
                        <Form.Control placeholder={selectedDept} disabled/>
                        <Form.Label>
                            Meeting Room
                        </Form.Label>
                        <Form.Control />
                        
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