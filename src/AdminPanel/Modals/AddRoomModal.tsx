import React, {SyntheticEvent} from "react";
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
    const [meetingRoom, setMeetingRoom] = useState({
        id: props.id,
        room: ''
    })

    const SubmitAddRoom = (e:SyntheticEvent) => {
        e.preventDefault();
        if (props.id === meetingRoom.id) {
            let roomSubstr:string = meetingRoom.room.substring(0,10);
            const data:IDailyForm = {day: new Date(),
            id:meetingRoom.id,
            name: 0,
            room: meetingRoom.room,
            time_in: new Date().toLocaleTimeString('en-GB'),
            time_out: new Date().toLocaleTimeString('en-GB'),
            tag: "",
            tag_ret: false
            }
        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addRoom(dataJSON).then(
            res => {
                console.log(res.toString());
                props.updateParent(props.id);
            }
        );
        }
        else {
            console.log("Error on props.id");
        }
        props.closeModal();
    }

    return(<Modal
    show={props.showModal}
    keyboard={false}
    backdrop="static"
    onHide={() => props.closeModal}
    >
         
    <Modal.Header closeButton>
        <Modal.Title>Add Meeting Room</Modal.Title>
    </Modal.Header>
    <Form onSubmit={SubmitAddRoom}>
        <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Type Meeting Room for {props.name}</Form.Label>
                    <Form.Control 
                        type="input"
                        value={meetingRoom.room}
                        onChange={e => {
                            setMeetingRoom({id:meetingRoom.id, room: e.target.value})}}
                    />
                </Form.Group>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                    <Button variant='secondary' 
                        onClick={() => props.closeModal()}>
                            Cancel
                        </Button>
                </ModalFooter>
            </Form>        
    </Modal>)
}

export default AddRoomModal;