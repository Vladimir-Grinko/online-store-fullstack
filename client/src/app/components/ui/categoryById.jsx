import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCatalogById, getCatalogLoadingStatus } from "../../store/catalog";

const CategoryById = ({ id }) => {
    const isLoading = useSelector(getCatalogLoadingStatus());
    const category = useSelector(getCatalogById(id));

    if (isLoading) return "Loading....";
    return <p>{category.name}</p>;
};
CategoryById.propTypes = {
    id: PropTypes.string
};

export default CategoryById;
