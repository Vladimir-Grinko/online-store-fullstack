import React, { useState, useEffect } from "react";
import Pagination from "../../pagination";
import { paginate } from "../../../../utils/paginate";
import _ from "lodash";
import ProductCard from "../../../ui/productCard";
import SortDropdown from "../../../ui/sortDropdown";
import GroupList from "../../groupList";
import { useSelector } from "react-redux";
import { getGoods, getGoodsLoadingStatus } from "../../../../store/goods";

import {
    getCatalogList,
    getCatalogLoadingStatus
} from "../../../../store/catalog";
import Loader from "../../loader";
import { getUser } from "../../../../store/user";

const HomePage = () => {
    const goods = useSelector(getGoods());
    const catalog = useSelector(getCatalogList());

    const isLoadingCatalog = useSelector(getCatalogLoadingStatus());
    const isLoadingGoods = useSelector(getGoodsLoadingStatus());
    const user = useSelector(getUser());

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchProduct, setSearchProduct] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchProduct]);

    const handleCategorySelect = (item) => {
        if (searchProduct !== "") setSearchProduct("");
        setSelectedCategory(item.groupId);
    };
    const handleSearchProduct = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchProduct(target.value);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredGoods = searchProduct
        ? goods.filter(
              (product) =>
                  product.name
                      .toUpperCase()
                      .indexOf(searchProduct.toUpperCase()) !== -1
          )
        : selectedCategory
        ? goods.filter(
              (product) =>
                  JSON.stringify(product.group) ===
                  JSON.stringify(selectedCategory)
          )
        : goods;

    const clearFilter = () => {
        setSelectedCategory(undefined);
    };

    const sortedGoods = _.orderBy(filteredGoods, [sortBy.path], [sortBy.order]);
    const goodsCrop = paginate(sortedGoods, currentPage, pageSize);

    let count = filteredGoods ? filteredGoods.length : 1;

    if (isLoadingCatalog && isLoadingGoods && !goods && !catalog) {
        return <Loader />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <form className="d-flex">
                        <span className="badge m-1 rounded form-control bg-dark">
                            <input
                                className="form-control me-sm-2 readonly"
                                type="text"
                                placeholder="Поиск..."
                                value={searchProduct}
                                onChange={handleSearchProduct}
                            />
                        </span>
                    </form>
                </div>
                <div className="col-6">
                    <span className="badge m-1 rounded form-control bg-dark">
                        <SortDropdown onSort={handleSort} />
                    </span>
                </div>
                <GroupList
                    items={catalog}
                    onItemSelect={handleCategorySelect}
                    selectedItem={selectedCategory}
                    handleClick={clearFilter}
                />
                <div className="col-9">
                    {goodsCrop.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            user={user}
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-center">
                    {count > 0 && (
                        <Pagination
                            itemsCount={count}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

export default HomePage;
