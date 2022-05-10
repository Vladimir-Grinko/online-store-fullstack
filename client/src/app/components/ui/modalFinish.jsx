import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const ModalFinish = ({ show, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Поздравляем!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы успешно оформили заказ!</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary rounded" onClick={onClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
ModalFinish.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
export default ModalFinish;
