import React from 'react';
import {useState} from 'react';
import {Button, Modal, ModalFooter, Form} from 'react-bootstrap';
import { StaffApiService, IDailyForm } from '../Api/api.service';

interface TagReturnedProps {
    id: number | undefined,
    showModal: boolean,
    NoTagReturned: () => boolean,
    YesTagReturned: () => boolean

}

function TagReturnedModal(props: TagReturnedProps) {


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
                Did you return your tag?
            </Modal.Body>
            <ModalFooter>
                <Button variant="Success" onClick={props.YesTagReturned}>
                    Yes
                </Button>
                <Button variant="Danger" onClick={props.NoTagReturned}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default TagReturnedModal;