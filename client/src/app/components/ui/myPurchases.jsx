import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    getProductsInPurchases,
    getSummCountOfPurchases
} from "../../store/user";
import history from "../../utils/history";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import PurchaseCard from "./purchaseCard";

const MyPurchases = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const purchasesList = useSelector(getProductsInPurchases());
    const summCount = useSelector(getSummCountOfPurchases());
    const pageSize = 4;
    const count = purchasesList.length || 1;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const purchasesCrop = paginate(purchasesList, currentPage, pageSize);

    return (
        <div className="container-fluid">
            <h2 className="d-flex justify-content-center">
                <span className="m-2">Мои покупки</span>
            </h2>
            {summCount === 0 ? (
                <div className="card">
                    <h5 className="card-header">Печально!</h5>
                    <div className="card-body">
                        <h5 className="card-title">
                            Вы еще ничего не покупали.
                        </h5>
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
                    <div className="row justify-content-center">
                        {purchasesCrop.map((product) => (
                            <PurchaseCard
                                key={product._id}
                                productId={product._id}
                            />
                        ))}
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

export default MyPurchases;
