import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    getIsAdmin,
    getIsLoggedIn,
    getSummCountOfBasket,
    getUser
} from "../../store/user";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const summCount = useSelector(getSummCountOfBasket());
    const user = useSelector(getUser());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getIsAdmin());

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-1 rounded">
            <div className="container-fluid">
                {isAdmin && (
                    <li className="nav-item">
                        <Link to="/administrator">
                            <button
                                type="button"
                                className="btn btn-primary bg-dark position-relative"
                            >
                                Админ панель
                            </button>
                        </Link>
                    </li>
                )}
                <Link to="/">
                    <button
                        type="button"
                        className="btn btn-primary fs-5 bg-dark position-relative"
                    >
                        Главная
                    </button>
                </Link>
                <button
                    className={
                        "navbar-toggler " + (isVisible ? "" : "collapsed")
                    }
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded={isVisible}
                    aria-label="Toggle navigation"
                    onClick={handleToggle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className={
                        `collapse navbar-collapse ` + (isVisible ? " show" : "")
                    }
                    id="navbarColor02"
                >
                    <ul className="navbar-nav me-auto">
                        {isLoggedIn === false ? (
                            <li className="nav-item">
                                <Link to="login">
                                    <button
                                        type="button"
                                        className="btn btn-primary fs-5 bg-dark position-relative"
                                    >
                                        Вход
                                    </button>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <div className="container-fluid align-self-center">
                                    <li className="nav-item">
                                        <Link to="/basket">
                                            <button
                                                type="button"
                                                className="btn btn-primary fs-5 bg-dark position-relative"
                                            >
                                                Корзина
                                                {summCount > 0 && (
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light">
                                                        {summCount}
                                                    </span>
                                                )}
                                            </button>
                                        </Link>
                                    </li>
                                </div>
                            </>
                        )}
                    </ul>
                    {isLoggedIn && (
                        <div className="align-items-end">
                            <NavProfile name={user.name} />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
