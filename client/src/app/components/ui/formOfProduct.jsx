import React from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import TextAreaField from "../common/form/textAreaField";

const FormOfProduct = ({ data, errors, onChange, onSubmit, catalogList }) => {
    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Название"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={onChange}
            />
            <TextField
                label="Стоимость"
                name="price"
                value={data.price}
                error={errors.price}
                onChange={onChange}
            />
            <SelectField
                label="Выберите категорию"
                defaultOption="Choose..."
                options={catalogList}
                onChange={onChange}
                value={data.group}
                error={errors.group}
                name="group"
            />
            <TextField
                label="Фото"
                name="image"
                value={data.image}
                error={errors.image}
                onChange={onChange}
            />
            <TextField
                label="Количество"
                name="amount"
                value={data.amount}
                error={errors.amount}
                onChange={onChange}
            />
            <TextField
                label="Рейтинг"
                name="rate"
                value={data.rate}
                error={errors.rate}
                onChange={onChange}
            />
            <TextAreaField
                label="Описание"
                name="description"
                value={data.description}
                error={errors.description}
                onChange={onChange}
                rows="5"
            />
        </form>
    );
};
FormOfProduct.propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    catalogList: PropTypes.array
};

export default FormOfProduct;
