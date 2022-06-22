import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

const ModalAction = ({ show, title, body, buttonText, onClickHandler, onHideHandler }) => {
    return (
        <div>
            <Modal show={show} onHide={onHideHandler}>
                {
                    title &&
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                }
                <Modal.Body>{body}</Modal.Body>
                {
                    buttonText &&
                    <Modal.Footer>
                        <Button className='btn btn-outline-success form-control' onClick={onClickHandler}>
                            {buttonText}
                        </Button>
                    </Modal.Footer>
                }
            </Modal>
        </div>
    )
}

export default ModalAction