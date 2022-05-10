import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/common/page/productPage/productPage";
import HomePage from "../components/common/page/productsListPage/homePage";

const CatalogForClient = () => {
    const params = useParams();
    const { productId } = params;

    return <>{productId ? <ProductPage id={productId} /> : <HomePage />}</>;
};

export default CatalogForClient;
