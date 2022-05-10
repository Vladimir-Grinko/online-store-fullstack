import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductsIdsBasket,
    getSummCountOfBasket,
    getSummPriceOfBasket,
    getUser,
    handlingOfBasket
} from "../../store/user";
import history from "../../utils/history";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import BasketCard from "./basketCard";
import ModalFinish from "./modalFinish";
import ProductCardBasket from "./productCardBasket";

const Basket = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const goodsList = useSelector(getProductsIdsBasket());
    const user = useSelector(getUser());
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        dispatch(handlingOfBasket({ ...user, basket: [] }));
    };
    const handleShow = () => {
        setShow(true);
    };

    const handleDelete = (prodId) => {
        const updateBasket = goodsList.filter((prod) => prod._id !== prodId);
        dispatch(handlingOfBasket({ ...user, basket: updateBasket }));
    };

    const handleIssue = () => {
        const myPurchase = [...user.purchases];
        const endPurchaseList = [];
        if (myPurchase === []) {
            endPurchaseList.push(goodsList);
        } else {
            goodsList.filter((item) => {
                if (!myPurchase.some((element) => element._id === item._id)) {
                    endPurchaseList.push({
                        _id: item._id,
                        count: 1,
                        price: item.price
                    });
                }
            });
        }
        const purchase = [...endPurchaseList, ...myPurchase];

        dispatch(
            handlingOfBasket({
                ...user,
                purchases: purchase
            })
        );

        handleShow();
    };
    const pageSize = 4;
    const count = goodsList.length || 1;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const summPrice = useSelector(getSummPriceOfBasket());
    const summCount = useSelector(getSummCountOfBasket());

    const goodsCrop = paginate(goodsList, currentPage, pageSize);
    return (
        <div className="container-fluid">
            <ModalFinish show={show} onClose={handleClose} />
            <h2 className="d-flex justify-content-center">
                <span>Корзина</span>
            </h2>
            {summCount === 0 ? (
                <div className="card">
                    <h5 className="card-header">Печально!</h5>
                    <div className="card-body">
                        <h5 className="card-title">Ваша корзина пуста.</h5>
                        <p className="card-text">
                            Надеемся, Вы найдете у нас именно то, что Вам нужно.
                        </p>
                        <button
                            className="btn btn-primary rounded"
                            onClick={() => history.push("/")}
                        >
                            Перейти к покупкам
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-9">
                            {goodsCrop.map((product) => (
                                <ProductCardBasket
                                    key={product._id}
                                    productId={product._id}
                                    onHandleDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <BasketCard
                            lenght={summCount}
                            summPrice={summPrice}
                            onHandleIssue={handleIssue}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Basket;
