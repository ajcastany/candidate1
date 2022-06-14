import React from "react";
import { Modal, ModalFooter, Button, ButtonGroup } from "react-bootstrap";
import { IDailyForm, StaffApiService } from "../../Api/api.service";

interface IEditTagReturnedProps {
    id: number | undefined,
    tag: string,
    showModal: boolean,
    closeModal: () => boolean
    updateParent: (id:number | undefined) => void
}

function EditTagReturnedModal(props: IEditTagReturnedProps) {
    function YesTagReturned() {
        const data:IDailyForm = {
            day: new Date(),
            id: props.id,
            name: 0,
            room: '',
            time_in: new Date().toLocaleTimeString('en-GB'),
            time_out: new Date().toLocaleTimeString('en-GB'),
            tag: props.tag,
            tag_ret: true
        }

        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTagRetJSON(dataJSON).then(
            res => {
                props.updateParent(props.id);
            }
        )
        props.closeModal();
    }

    function NoTagReturned() {
        const data:IDailyForm = {
            day: new Date(),
            id: props.id,
            name: 0,
            room: '',
            time_in: new Date().toLocaleTimeString('en-GB'),
            time_out: new Date().toLocaleTimeString('en-GB'),
            tag: props.tag,
            tag_ret: false
        }

        var dataTXT = JSON.stringify(data);
        var dataJSON = JSON.parse(dataTXT);
        StaffApiService.addTagRetJSON(dataJSON).then(
            res => {
                props.updateParent(props.id);
            }
        )
        props.closeModal();
    }

    return(
    <Modal
        show={props.showModal}
        backdrop='static'
        keyboard={false}
        onHide={() => props.closeModal()}
    >
        <Modal.Header closeButton>
            <Modal.Title>Was the Tag returned?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Was tag <strong>{props.tag}</strong> returned?
        </Modal.Body>
        <ModalFooter className='justify-content-between'>
            <ButtonGroup>
                <Button variant='success' size='lg' onClick={YesTagReturned}>
                    Yes
                </Button>
                <Button variant='danger' size='lg' onClick={NoTagReturned}>
                    No
                </Button>
            </ButtonGroup>
        </ModalFooter>


    </Modal>)
}

export default EditTagReturnedModal;