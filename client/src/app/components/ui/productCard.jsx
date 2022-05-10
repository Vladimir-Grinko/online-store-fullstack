import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import history from "../../utils/history";
import { rateStar } from "../../styles/images";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, handlingOfBasket } from "../../store/user";
import ModalMessageForAuth from "./modalMessageForAuth";
import { toast } from "react-toastify";

const ProductCard = ({ product, user }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isLoggedIn = useSelector(getIsLoggedIn());

    const goToProductPage = () => {
        history.push("/" + product._id);
    };

    const buttonBasketMessage = () =>
        toast("Товар уже в корзине!", {
            position: "top-center",
            autoClose: 3000
        });

    const handlePushBasket = () => {
        if (isLoggedIn) {
            const basketOfUser = [...user.basket];
            const index = basketOfUser.findIndex((p) => p._id === product._id);

            if (index !== -1) {
                buttonBasketMessage();
            } else {
                basketOfUser.push({
                    _id: product._id,
                    count: 1,
                    price: product.price
                });
            }

            dispatch(handlingOfBasket({ ...user, basket: basketOfUser }));
        } else {
            handleShow();
        }
    };
    return (
        <div className="card mb-3 align-self-end">
            <ModalMessageForAuth show={show} onClose={handleClose} />
            <div className="row g-0">
                <div className="col-md-3 align-items-center position-relative">
                    <img
                        src={product.image}
                        className="img-fluid rounded-start m-2"
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
                        className="btn btn-outline-secondary m-3 rounded"
                        onClick={goToProductPage}
                    >
                        Подробнее
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-success m-3 rounded"
                        onClick={handlePushBasket}
                    >
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default ProductCard;
