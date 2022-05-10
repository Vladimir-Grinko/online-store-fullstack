import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/common/loader";
import { logOut } from "../store/user";

const LogOut = () => {
    const dispatch = useDispatch();
    const buttonBasketMessage = () =>
        toast.success("Вы вышли из аккаунта!", {
            position: "top-center",
            autoClose: 4000
        });

    useEffect(() => {
        dispatch(logOut());
        buttonBasketMessage();
    }, []);

    return <Loader />;
};

export default LogOut;
