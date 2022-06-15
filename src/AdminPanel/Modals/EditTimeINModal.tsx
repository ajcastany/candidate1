import React, { useEffect } from "react";
import {useState} from 'react';
import { Modal, Form, Button, ModalFooter } from "react-bootstrap";
import Select from 'react-select';

interface IEditTimeModalProps {
    id: number | undefined,
    INOUT: string,
    time: string,
    showModal: boolean,
    closeModal: () => boolean,
    updateParent: (id: number | undefined) => void
}

function EditTimeINModal(props:IEditTimeModalProps) {
    const [editTimeState, setEditTimeState] = useState ({
        id: props.id,
        INOUT: props.INOUT,
        time: props.time,
    });
    const [timeValue, setTimeValue] = useState( () => {
        if (props.time === 'None') {
            return "08:00";
        } 
        else {
            let time:string = props.time.substring(0,5);
            return time;
        }
        
    });

    function SubmitTimeValue() {
        console.log("time: " + props.INOUT + ": " + props.time);
    }
    
    
    return(
    <Modal 
        show={props.showModal}
        backdrop="static"
        onHide={() => props.closeModal}
    >
        <Modal.Header closeButton>
            Edit Time
        </Modal.Header>
            <Form onSubmit={SubmitTimeValue}>
                <Modal.Body>
                    <Form.Group className="bm-3">
                        <Form.Label>Enter time <strong>{props.INOUT}</strong></Form.Label>
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