import React from 'react';
import {useState} from 'react';
import {Button, Modal, ModalFooter, Form, ButtonGroup} from 'react-bootstrap';
import { StaffApiService, IDailyForm } from '../Api/api.service';

interface TagReturnedProps {
    id: number | undefined,
    tag: string,
    showModal: boolean,
    closeModal: () => boolean
}

function TagReturnedModal(props: TagReturnedProps) {
    function YesTagReturned() {
        const data:IDailyForm = {
            day: new Date(0),
            id: props.id,
            name: 0,
            room: "",
            time_in: new Date(0).toISOString(),
            time_out: new Date(0).toISOString(),
            tag: props.tag,
            tag_ret: true,
        }

        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTagRetJSON(dataJSON).then(
            res => {
                props.closeModal();
            }
        )
    }

    function NoTagReturned() {
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
                <Modal.Title>Did you return your Tag?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Did you return Tag <strong>{props.tag}</strong>?
            </Modal.Body>
            <ModalFooter className='justify-content-between'>
                <ButtonGroup >
                    <Button variant="success" size='lg' onClick={YesTagReturned}>
                        Yes
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="danger" size='lg' onClick={NoTagReturned}>
                        No
                    </Button>
                </ButtonGroup>
            </ModalFooter>
        </Modal>
    )
}

export default TagReturnedModal;