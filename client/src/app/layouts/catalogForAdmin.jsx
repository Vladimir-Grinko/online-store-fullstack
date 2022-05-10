import React from "react";
import { useParams } from "react-router-dom";
import AdminPage from "../components/common/page/adminPage/adminPage";
import ProductPage from "../components/common/page/productPage/productPage";
import ProductPageEdit from "../components/common/page/productPageEdit";

const CatalogForAdmin = () => {
    const params = useParams();
    const { productId, edit } = params;

    return (
        <>
            {productId ? (
                edit ? (
                    <ProductPageEdit id={productId} />
                ) : (
                    <ProductPage id={productId} />
                )
            ) : (
                <AdminPage />
            )}
        </>
    );
};

export default CatalogForAdmin;
