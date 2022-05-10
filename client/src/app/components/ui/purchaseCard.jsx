import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/goods";
import { Link } from "react-router-dom";

const PurchaseCard = ({ productId }) => {
    const product = useSelector(getProductById(productId));

    if (!product) return null;

    return (
        <div className="card rounded col-3 mb-1 h-33">
            <img
                src={product.image}
                className="card-img-bottom m-1 mx-auto"
                alt="..."
            />

            <div className="card-body">
                <h6 className="card-title">
                    <Link to={`/${product._id}`}>{product.name}</Link>
                </h6>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Стоимость:{" "}
                    <p className="text-info">
                        {new Intl.NumberFormat("ru-RU").format(product.price)} ₽{" "}
                    </p>
                </li>
            </ul>
        </div>
    );
};
PurchaseCard.propTypes = {
    productId: PropTypes.string
};

export default PurchaseCard;
