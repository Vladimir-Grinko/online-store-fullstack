import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsAdmin, getIsLoggedIn } from "../../store/user";

const ProtectedRouteForAdmin = ({
    component: Component,
    children,
    ...rest
}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getIsAdmin());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn || isAdmin === false) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};
ProtectedRouteForAdmin.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRouteForAdmin;
