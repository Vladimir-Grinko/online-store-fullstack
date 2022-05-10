import React from "react";
import PropTypes from "prop-types";

const BasketCard = ({ lenght, summPrice, onHandleIssue }) => {
    return (
        <div className="col-3">
            <div className="card border-success rounded mb-3">
                <div className="card-header text-center">Итого в корзине: </div>
                <div className="card-body">
                    <h4 className="card-title">
                        Количество товаров:{" "}
                        <p className="text-warning">{lenght}</p>
                    </h4>
                    <hr />
                    <h3 className="card-title">
                        На сумму:{" "}
                        <p className="text-info">
                            {new Intl.NumberFormat("ru-RU").format(summPrice)} ₽{" "}
                        </p>
                    </h3>
                </div>
                <button
                    type="button"
                    className="btn btn-outline-success m-3 rounded"
                    onClick={onHandleIssue}
                >
                    Оформить
                </button>
            </div>
        </div>
    );
};

BasketCard.propTypes = {
    lenght: PropTypes.number,
    summPrice: PropTypes.number,
    onHandleIssue: PropTypes.func
};
export default BasketCard;
