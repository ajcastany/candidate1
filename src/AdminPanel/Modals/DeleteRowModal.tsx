import React, { SyntheticEvent } from 'react';
import { Button, Modal, ModalFooter, ButtonGroup } from 'react-bootstrap';
import { StaffApiService } from '../../Api/api.service';

interface IDeleteRowProps{
    showModal: boolean
    closeModal: () => boolean
    updateParentAdmin: () => void
    id: number | undefined
    name: string
}
interface IDeleteJSON {
    id:number | undefined
}
function DeleteRowModal(props:IDeleteRowProps) {

    function DeleteEntry(e:SyntheticEvent) {
        e.preventDefault();
        StaffApiService.deleteEntry(props.id).then( res => {
        console.log(res);

        });
        props.updateParentAdmin();            
        props.closeModal();
    }

    return(<Modal
        show={props.showModal}
        backdrop="static"
        onHide={() => props.closeModal()}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete entry for <strong>{props.name}</strong>
            </Modal.Body>
            <ModalFooter className="justify-contents-between">
                <ButtonGroup>
                    <Button variant='danger' size='lg' onClick={DeleteEntry}>Delete</Button>
                    <Button variant='secondary' size='lg' onClick={props.closeModal}>Cancel</Button>
                </ButtonGroup>
            </ModalFooter>
    </Modal>);
}

export default DeleteRowModal;