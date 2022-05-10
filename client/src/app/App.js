import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouteForAdmin from "./components/common/protectedRouteForAdmin";
import ProtectedRouteForUser from "./components/common/protectedRouteForUser";
import Basket from "./components/ui/basket";
import AppLoader from "./components/ui/hoc/appLoader";
import MyPurchases from "./components/ui/myPurchases";
import NavBar from "./components/ui/navBar";
import CatalogForAdmin from "./layouts/catalogForAdmin";
import CatalogForClient from "./layouts/catalogForClient";
import Login from "./layouts/logIn";
import LogOut from "./layouts/logOut";

const App = () => {
    return (
        <div className="container">
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/login/:type?" component={Login} />

                    <ProtectedRouteForAdmin
                        path="/administrator/:productId?/:edit?"
                        component={CatalogForAdmin}
                    />

                    <ProtectedRouteForUser path="/logout" component={LogOut} />
                    <ProtectedRouteForUser path="/basket" component={Basket} />
                    <ProtectedRouteForUser
                        path="/purchases"
                        component={MyPurchases}
                    />
                    <Route path="/:productId?" component={CatalogForClient} />
                    <Route exact path="/" component={CatalogForClient} />

                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
};

export default App;
