import React from "react";
import { useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";

interface TagModelProps {
    id: number | undefined,
    showModal: boolean,
    closeModal: () => boolean
}

function TagModal(props: TagModelProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const addTag = (tag:string) => {
        console.log("Tag: " + tag + " ID: " + props.id);
        return tag;
    }

    
    return (
        <Modal
            show={props.showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            cancel={() => props.closeModal()}
            >
            <Modal.Header closeButton>
                <Modal.Title>Issue Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Issued tag number:
            </Modal.Body>
            <ModalFooter>
                <Button variant='primary' onClick={() => addTag("s")}>
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