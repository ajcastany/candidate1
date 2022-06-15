import React, {SyntheticEvent} from "react";
import {useState} from 'react';
import { Form, Modal, ModalFooter, Button } from "react-bootstrap";
import { StaffApiService, IDailyForm } from "../../Api/api.service";


interface ITagIssueModalProps {
    id: number | undefined,
    showModal: boolean,
    closeModal: () => boolean,
    updateParent: (id:number | undefined) => void
}
function EditTagIssueModal(props: ITagIssueModalProps) {
    const [tagValue, setTagValue] = useState({
        id: props.id,
        tag: ''
    })
    const SubmitTagValue = (event:SyntheticEvent) => {
        event.preventDefault();
        if (props.id === tagValue.id) {
            let tabSubstring:string = tagValue.tag.substring(0,10);
            const data:IDailyForm = {
                day: new Date(),
                id: tagValue.id,
                name: 0,
                room: '',
                time_in: new Date().toLocaleTimeString('en-GB'),
                time_out: new Date().toLocaleTimeString('en-GB'),
                tag: tabSubstring,
                tag_ret: false
            }
        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTagJSON(dataJSON).then(
            res => {
                console.log(res);
                props.updateParent(props.id)
            })

        } else {
            console.log("Error on props.id")
        }
        props.closeModal();
    }

    return(
        <Modal
            show={props.showModal}
            backdrop="static"
            keyboard={false}
            onHide={() => props.closeModal}
            >
            <Modal.Header closeButton>
                <Modal.Title>Issue Tag</Modal.Title>
            </Modal.Header>
            <Form onSubmit={SubmitTagValue}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>Enter Tag Number</Form.Label>
                            <Form.Control type='input'
                                value={tagValue.tag}
                                onChange={e=> setTagValue({id:tagValue.id, tag:e.target.value})}
                                />
                    </Form.Group>
                </Modal.Body>
                <ModalFooter>
                    <Button variant='primary' type='submit'>
                        Issue
                    </Button>
                    <Button variant='secondary' onClick={() => props.closeModal()}>
                        Close
                    </Button>
                </ModalFooter>
            </Form>
            
        </Modal>)
}

export default EditTagIssueModal;