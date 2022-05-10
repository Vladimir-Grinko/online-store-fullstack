import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem,
    handleClick
}) => {
    return (
        <div className="col-3">
            <h4 className="text-center"> Каталог </h4>
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        key={items[item][valueProperty]}
                        className={
                            "list-group-item d-flex justify-content-between align-items-start" +
                            (items[item]["groupId"] === selectedItem
                                ? " active"
                                : "")
                        }
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
                <button className="btn btn-dark m-2" onClick={handleClick}>
                    Сброс
                </button>
            </ul>
        </div>
    );
};
GroupList.propTypes = {
    items: PropTypes.array.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.string,
    handleClick: PropTypes.func
};

export default GroupList;
