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

function EditTimeINModal(props:IEditTimeModalProps) {
    const [editTimeState, setEditTimeState] = useState ({
        id: props.id,
        time: props.timeIN,
    });
    const [timeValue, setTimeValue] = useState( () => {
        if (props.timeIN === 'None') {
            return "08:00";
        } 
        else {
            let time:string = props.timeIN.substring(0,5);
            return time;
        }
        
    });

    const SubmitTimeValue = (e:SyntheticEvent) => {
        e.preventDefault();
        let timeINFormat = '';
        if (timeValue !== '') {
            timeINFormat = timeValue + ":00";
        }
        if (timeValue === '') {
            console.log("Empty") 
            timeINFormat = "None";
        }
        
        console.log("time: " + timeValue);
        let data:IDailyForm = {
            day: new Date(),
            id: props.id,
            name: 0,
            room: '',
            time_in: timeINFormat,
            time_out: props.timeOUT,
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
            Edit Time IN
        </Modal.Header>
            <Form onSubmit={SubmitTimeValue}>
                <Modal.Body>
                    <Form.Group className="bm-3">
                        <Form.Label>Enter time <strong>IN</strong></Form.Label>
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

export default EditTimeINModal;