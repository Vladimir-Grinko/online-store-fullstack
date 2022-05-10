import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { rateStar } from "../../styles/images";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/goods";

const ProductCardBasket = ({ productId, onHandleDelete }) => {
    const product = useSelector(getProductById(productId));

    return (
        <div className="card mb-3 align-self-start">
            <div className="row g-0">
                <div className="col-md-3 align-items-center position-relative">
                    <img
                        src={product.image}
                        className="img-fluid rounded-start"
                        alt="..."
                        width="150"
                        height="120"
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <Link to={`/${product._id}`}>
                            <h5 className="card-title">{product.name}</h5>
                        </Link>

                        <div>
                            <p className="p-2">
                                <img
                                    src={rateStar}
                                    alt=""
                                    width="21"
                                    height="21"
                                />
                                {product.rate}
                            </p>
                        </div>
                        <h2>
                            <p className="card-text">
                                <small className="text-muted">
                                    {new Intl.NumberFormat("ru-RU").format(
                                        product.price
                                    )}{" "}
                                    ₽
                                </small>
                            </p>
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-danger m-3 rounded"
                        onClick={() => onHandleDelete(product._id)}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCardBasket.propTypes = {
    productId: PropTypes.string.isRequired,
    onHandleDelete: PropTypes.func.isRequired
};

export default ProductCardBasket;
