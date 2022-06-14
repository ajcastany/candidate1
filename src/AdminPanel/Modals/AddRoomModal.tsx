import React from "react";
import {useState} from 'react';
import { Modal, Button, ModalFooter, Form } from "react-bootstrap";
import {StaffApiService, IDailyForm} from "../../Api/api.service";

interface AddRoomProps {
    id: number|undefined,
    name: string,
    showModal: boolean,
    closeModal: () => boolean,
    updateParent: (id:number | undefined) => void
}

function AddRoomModal(props:AddRoomProps) {
    const [meetinRoom, setMeetingRoom] = useState({
        id: props.id,
        room: ''
    })

    return(<Modal
    show={props.showModal}
    backdrop="static"
    onHide={() => props.closeModal}
    >
    <Modal.Header closeButton>
        <Modal.Title>Add Meeting Room</Modal.Title>
    </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>Type Meeting Room for {props.name}</Form.Label>
                <Form.Control 
                    type="input"
                    value={meetinRoom.room}
                    onChange={e => {
                        setMeetingRoom({id:meetinRoom.id, room: e.target.value})}}
                />
            </Form.Group>
        </Modal.Body>
        <ModalFooter>
            <Button variant="primary" type="submit">
                Add Room
            </Button>
            <Button variant='secondary' 
                onClick={() => props.closeModal()}>
                    Cancel
                </Button>
        </ModalFooter>
    </Modal>)
}

export default AddRoomModal;