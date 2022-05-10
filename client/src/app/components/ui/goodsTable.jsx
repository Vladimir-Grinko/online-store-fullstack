import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CategoryById from "./categoryById";
import Table from "../common/table/table";

const GoodsTable = ({ goods, onSort, selectedSort, onHandleDelete }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (product) => (
                <Link to={`/administrator/${product._id}`}>{product.name}</Link>
            )
        },
        image: {
            name: "Фото",
            component: (product) => (
                <img src={product.image} alt="" width="auto" height={60} />
            )
        },
        group: {
            name: "Категория",
            component: (product) => <CategoryById id={product.group} />
        },
        amount: {
            path: "amount",
            name: "Количество"
        },
        price: { path: "price", name: "Стоимость" },
        delete: {
            component: (product) => (
                <button
                    onClick={() => onHandleDelete(product._id)}
                    className="btn bg-danger btn-sm text-white rounded"
                >
                    Удалить
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={goods}
        />
    );
};
GoodsTable.propTypes = {
    goods: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onHandleDelete: PropTypes.func
};

export default GoodsTable;
