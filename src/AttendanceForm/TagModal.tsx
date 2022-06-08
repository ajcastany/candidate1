import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { Button, Modal, ModalFooter, Form } from "react-bootstrap";
import {StaffApiService, IDailyForm} from "../Api/api.service"

interface TagModelProps {
    id: number | undefined,
    showModal: boolean,
    closeModal: () => boolean,
    updateParent: (id:number | undefined) => void
}

function TagModal(props: TagModelProps) {
    const [tagValue, setTagValue] = useState({
        id: props.id,
        tag: ''
    });

    const SubmitTagValue = (event:SyntheticEvent)  => {
        event.preventDefault();
        if (props.id === tagValue.id) {
            //console.log('id: ' + tagValue.id + " tag: " + tagValue.tag);    
            const data:IDailyForm = {day: new Date(0),
                id:tagValue.id,
                name: 0,
                room: '',
                time_in: new Date(0),
                time_out: new Date(0),
                tag: tagValue.tag,
                tag_ret: false
                }
            var dataTXT = JSON.stringify(data)
            var dataJSON = JSON.parse(dataTXT);
            //console.log(dataJSON);
            StaffApiService.addTagJSON(dataJSON).then(
                res => {
                    console.log(res);
                    props.updateParent(props.id)});
        }
        else {
            console.log("Error on props.id");
        }
        
        props.closeModal();
    }
    
    return (
        <Modal
            show={props.showModal}
            backdrop="static"
            keyboard={false}
            onHide={() => props.closeModal()}
            cancel={() => props.closeModal()}

            >
            <Modal.Header closeButton>
                <Modal.Title>Issue Tag</Modal.Title>
            </Modal.Header>
            <Form onSubmit={SubmitTagValue}>
            <Modal.Body>
            
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Tag Number:</Form.Label>
                        <Form.Control type="input"
                            value={tagValue.tag}
                            onChange={e => {setTagValue({id: tagValue.id, tag: e.target.value})}}

                            />
                    </Form.Group>
                    
            </Modal.Body>
            <ModalFooter>
                <Button variant='primary' type="submit">
                    Issue
                </Button>
                <Button variant='secondary' onClick={() => props.closeModal()}>
                    Close
                </Button>
            </ModalFooter>
            </Form>    
        </Modal>
    );
}

export default TagModal;