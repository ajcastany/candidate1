import React from "react";
import { useState } from "react";
import { Button, Modal, ModalFooter, Form } from "react-bootstrap";

interface TagModelProps {
    id: number | undefined,
    showModal: boolean,
    closeModal: () => boolean
}

function TagModal(props: TagModelProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [tagValue, setTagValue] = useState({
        id: props.id,
        tag: ''
    });

    function SubmitTagValue() {
        console.log('id: ' + tagValue.id + " tag: " + tagValue.tag);
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