import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import useForm from "../../../../hooks/useForm";
import { getCatalogList } from "../../../../store/catalog";
import { getProductById, updateProduct } from "../../../../store/goods";
import history from "../../../../utils/history";
import FormOfProduct from "../../../ui/formOfProduct";

const PropuctPageEdit = ({ id }) => {
    const currentProduct = useSelector(getProductById(id));
    const catalog = useSelector(getCatalogList());
    const dispatch = useDispatch();

    const [{ data, errors, isValid }, onChange] = useForm(currentProduct);

    const catalogList = catalog.map((с) => ({
        label: с.name,
        value: с.groupId
    }));

    const handleBack = () => {
        history.push(`/administrator/${currentProduct._id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        const newData = {
            ...data
        };

        dispatch(updateProduct(newData));
        history.push(`/administrator/${currentProduct._id}`);
    };

    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="btn btn-primary">
                <i className="bi bi-caret-left me-1"></i>
                Назад
            </button>
            <div className="row">
                <div className="col-md-8 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Изменение данных о товаре</h3>
                    <FormOfProduct
                        onSubmit={handleSubmit}
                        data={data}
                        errors={errors}
                        isValid={isValid}
                        onChange={onChange}
                        catalogList={catalogList}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mx-auto"
                        disabled={!isValid}
                        onClick={handleSubmit}
                    >
                        Обновить
                    </button>
                </div>
            </div>
        </div>
    );
};
PropuctPageEdit.propTypes = {
    id: PropTypes.string
};

export default PropuctPageEdit;
