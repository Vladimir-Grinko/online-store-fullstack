import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { imageProfile } from "../../styles/images";

const NavProfile = ({ name }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{name}</div>
                <img
                    src={imageProfile}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/purchases`} className="dropdown-item">
                    Мои покупки
                </Link>
                <Link to={"/logout"} className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

NavProfile.propTypes = {
    name: PropTypes.string
};

export default NavProfile;
