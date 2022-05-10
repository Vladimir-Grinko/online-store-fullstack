import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import FormOfProduct from "./formOfProduct";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogList, getCatalogLoadingStatus } from "../../store/catalog";
import { createProduct } from "../../store/goods";

const CreateProductForm = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const [{ data, errors, isValid }, onChange] = useForm({
        name: "",
        group: "",
        price: 0,
        image: "",
        amount: 0,
        rate: "",
        description: ""
    });

    const catalog = useSelector(getCatalogList());
    const isLoadingCatalog = useSelector(getCatalogLoadingStatus());

    const catalogList = catalog.map((с) => ({
        label: с.name,
        value: с.groupId
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        dispatch(createProduct(data));
        onClose();
    };

    if (isLoadingCatalog) return "Loading...";

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center">
                    Добавить новый товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormOfProduct
                    onSubmit={handleSubmit}
                    data={data}
                    errors={errors}
                    isValid={isValid}
                    onChange={onChange}
                    catalogList={catalogList}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Отмена
                </Button>
                <Button
                    disabled={!isValid}
                    variant="primary"
                    onClick={handleSubmit}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

CreateProductForm.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CreateProductForm;
