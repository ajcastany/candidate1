import React from 'react';
import {useState} from 'react';
import {Button, Modal, ModalFooter, Form} from 'react-bootstrap';
import { StaffApiService, IDailyForm } from '../Api/api.service';

interface TagReturnedProps {
    id: number | undefined,
    tag: string,
    showModal: boolean,
    closeModal: () => boolean
}

function TagReturnedModal(props: TagReturnedProps) {
    function YesTagReturned() {

    }

    function NoTagReturned() {

    }

    return (
        <Modal
        show={props.showModal}
        backdrop="static"
        keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Did you return your Tag?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Did you return Tag {props.tag}?
            </Modal.Body>
            <ModalFooter>
                <Button variant="success" onClick={YesTagReturned}>
                    Yes
                </Button>
                <Button variant="danger" onClick={NoTagReturned}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default TagReturnedModal;