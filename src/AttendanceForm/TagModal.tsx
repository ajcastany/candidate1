import React from "react";
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [tagValue, setTagValue] = useState({
        id: props.id,
        tag: ''
    });

    function SubmitTagValue() {
        
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

            StaffApiService.addTagJSON(dataJSON).then( res => props.updateParent(props.id));
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
            close={() => props.closeModal()}

            >
            <Modal.Header closeButton>
                <Modal.Title>Issue Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Tag Number:</Form.Label>
                        <Form.Control type="text"
                            value={tagValue.tag}
                            onChange={e => {setTagValue({id: tagValue.id, tag: e.target.value})}}
                            />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <ModalFooter>
                <Button variant='primary' onClick={() => SubmitTagValue()}>
                    Issue
                </Button>
                <Button variant='secondary' onClick={() => props.closeModal()}>
                    Close
                </Button>
            </ModalFooter>

        </Modal>
    );
}

export default TagModal;