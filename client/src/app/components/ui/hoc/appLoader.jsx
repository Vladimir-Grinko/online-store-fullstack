import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCatalogList,
    getCatalogLoadingStatus
} from "../../../store/catalog";
import { loadGoodsList, getGoodsLoadingStatus } from "../../../store/goods";
import { loadingUser, getIsLoggedIn } from "../../../store/user";
import Loader from "../../common/loader";

const AppLoader = ({ children }) => {
    const isLoadingCatalog = useSelector(getCatalogLoadingStatus());
    const isLoadingGoods = useSelector(getGoodsLoadingStatus());
    const isLoggedInUser = useSelector(getIsLoggedIn());

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCatalogList());
        dispatch(loadGoodsList());
        if (isLoggedInUser) {
            dispatch(loadingUser());
        }
    }, [isLoggedInUser]);

    if (isLoadingCatalog && isLoadingGoods) return <Loader />;
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
