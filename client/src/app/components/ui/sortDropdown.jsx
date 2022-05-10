import React, { useState } from "react";
import PropTypes from "prop-types";

const SortDropdown = ({ onSort }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleSortAsc = () => {
        onSort({ path: "price", order: "asc" });
    };
    const handleSortDesc = () => {
        onSort({ path: "price", order: "desc" });
    };

    const handleSortName = () => {
        onSort({ path: "name", order: "asc" });
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className=" text-center text-light">Сортировка</div>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <button
                    type="button"
                    className="btn btn-outline-dark dropdown-item text-center bg-light"
                    onClick={handleSortAsc}
                >
                    Сначала с низкой стоимостью
                </button>
                <button
                    type="button"
                    className="btn btn-outline-dark dropdown-item text-center bg-light"
                    onClick={handleSortDesc}
                >
                    Сначала с высокой стоимостью
                </button>
                <button
                    type="button"
                    className="btn btn-outline-dark dropdown-item text-center bg-light"
                    onClick={handleSortName}
                >
                    По названию
                </button>
            </div>
        </div>
    );
};

SortDropdown.propTypes = {
    onSort: PropTypes.func.isRequired
};

export default SortDropdown;
