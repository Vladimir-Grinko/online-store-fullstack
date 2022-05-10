import React, { useState } from "react";
import PropTypes from "prop-types";
import { rateStar } from "../../../../styles/images";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../../store/goods";
import history from "../../../../utils/history";
import ModalMessageForAuth from "../../../ui/modalMessageForAuth";
import {
    getIsAdmin,
    getIsLoggedIn,
    getUser,
    handlingOfBasket
} from "../../../../store/user";
import Loader from "../../loader";
import { toast } from "react-toastify";

const ProductPage = ({ id }) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isLoggedIn = useSelector(getIsLoggedIn());
    const user = useSelector(getUser());

    const prodId = useSelector(getProductById(id));
    const isAdmin = useSelector(getIsAdmin());

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    const handleAllGoods = () => {
        if (history.location.pathname === `/administrator/${id}`) {
            history.push("/administrator");
        } else {
            history.push("/");
        }
    };

    const buttonBasketMessage = () =>
        toast("Товар уже в корзине!", {
            position: "top-center",
            autoClose: 3000
        });

    const handlePushBasket = () => {
        if (isLoggedIn) {
            const basketOfUser = [...user.basket];
            const index = basketOfUser.findIndex((p) => p._id === prodId._id);

            if (index !== -1) {
                buttonBasketMessage();
            } else {
                basketOfUser.push({
                    _id: prodId._id,
                    count: 1,
                    price: prodId.price
                });
            }

            dispatch(handlingOfBasket({ ...user, basket: basketOfUser }));
        } else {
            handleShow();
        }
    };

    if (!prodId) {
        return <Loader />;
    }

    return (
        <div className="container-fluid">
            <ModalMessageForAuth show={show} onClose={handleClose} />
            <div className="row rounded">
                <div className="col-6">
                    <button
                        className="btn btn-primary m-3 w-100 rounded"
                        onClick={() => handleAllGoods()}
                    >
                        Все товары
                    </button>
                </div>
                <div className="card mb-3 align-self-center">
                    <div className="row g-0">
                        {prodId.image && (
                            <div className="col-md-4">
                                <img
                                    src={prodId.image}
                                    className="img-fluid rounded-start"
                                    alt="..."
                                />
                            </div>
                        )}
                        <div className="col-md-6">
                            <div className="card-body">
                                <h3 className="card-title">{prodId.name}</h3>
                                <p className="card-text">
                                    {prodId.description}
                                </p>
                                <div>
                                    <p className="p-2 text-start">
                                        <img
                                            src={rateStar}
                                            alt=""
                                            width="21"
                                            height="21"
                                        />
                                        {prodId.rate}
                                    </p>
                                </div>

                                <h2>
                                    <p className="card-text text-start">
                                        <small className="text-muted">
                                            {new Intl.NumberFormat(
                                                "ru-RU"
                                            ).format(prodId.price)}{" "}
                                            ₽
                                        </small>
                                    </p>
                                </h2>
                            </div>

                            {history.location.pathname !==
                                `/administrator/${id}` && (
                                <button
                                    type="button"
                                    className="btn btn-outline-success m-3 rounded align-self-end"
                                    onClick={handlePushBasket}
                                >
                                    В корзину
                                </button>
                            )}

                            {isAdmin &&
                                history.location.pathname ===
                                    `/administrator/${id}` && (
                                    <button
                                        className="btn btn-outline-info m-3 rounded align-self-end"
                                        onClick={handleClick}
                                    >
                                        Изменить
                                    </button>
                                )}

                            <div className="card-text text-center justify-content-end">
                                Наличие в пунктах выдачи: {prodId.amount}
                            </div>
                        </div>
                        <h6 className="card-text text-start">
                            Код товара: {prodId._id}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default ProductPage;
