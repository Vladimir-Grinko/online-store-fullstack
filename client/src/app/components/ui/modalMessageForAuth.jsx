import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ModalMessageForAuth = ({ show, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Вы не авторизованы!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Для совершения покупок необходимо{" "}
                <Link to={"/login"}>Войти</Link>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary rounded" onClick={onClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
ModalMessageForAuth.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func
};
export default ModalMessageForAuth;
