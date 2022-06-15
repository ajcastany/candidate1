import React, { SyntheticEvent, useEffect } from "react";
import {useState} from 'react';
import { Modal, Form, Button, ModalFooter } from "react-bootstrap";
import Select from 'react-select';
import { updateParenthesizedType } from "typescript";
import { IDailyForm, StaffApiService } from "../../Api/api.service";

interface IEditTimeModalProps {
    id: number | undefined,
    timeIN: string,
    timeOUT: string,
    showModal: boolean,
    closeModal: () => boolean,
    updateParent: (id: number | undefined) => void
}

function EditTimeOUTModal(props:IEditTimeModalProps) {
    const [editTimeState, setEditTimeState] = useState ({
        id: props.id,
        time: props.timeOUT,
    });
    const [timeValue, setTimeValue] = useState( () => {
        if (props.timeOUT === 'None') {
            return "08:00";
        } 
        else {
            let time:string = props.timeOUT.substring(0,5);
            return time;
        }
        
    });

    const SubmitTimeValue = (e:SyntheticEvent) => {
        e.preventDefault();
        let timeOUTFormat = '';
        if (timeValue !== '') {
            timeOUTFormat = timeValue + ":00";
        }
        if (timeValue === '') {
            console.log("Empty") 
            timeOUTFormat = "None";
        }
        
        console.log("time: " + timeValue);
        let data:IDailyForm = {
            day: new Date(),
            id: props.id,
            name: 0,
            room: '',
            time_in: props.timeIN,
            time_out: timeOUTFormat,
            tag: '',
            tag_ret: false
        }
        var dataTXT = JSON.stringify(data)
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTimeInOutJSON(dataJSON).then(
            res => {
                props.updateParent(props.id);
            });
        props.closeModal();
    }
    
    
    return(
    <Modal 
        show={props.showModal}
        backdrop="static"
        onHide={() => props.closeModal}
    >
        <Modal.Header closeButton>
            Edit Time OUT
        </Modal.Header>
            <Form onSubmit={SubmitTimeValue}>
                <Modal.Body>
                    <Form.Group className="bm-3">
                        <Form.Label>Enter time <strong>OUT</strong></Form.Label>
                            <Form.Control 
                                autoFocus
                                type='time' 
                                value={timeValue}
                                onChange={e => setTimeValue(
                                  e.target.value
                                )}
                                />
                    </Form.Group>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="primary" type='submit'>OK</Button>
                    <Button variant='secondary' onClick={() => props.closeModal()}>Cancel</Button>
                </ModalFooter>
            </Form>

    </Modal>);
}

export default EditTimeOUTModal;