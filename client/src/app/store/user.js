import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";
import { toast } from "react-toastify";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };
const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userRequested: (state) => {
            state.isLoading = true;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated: (state, action) => {
            state.entities = {
                ...state.entities,
                ...action.payload
            };
        },
        userReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdated,
    userRequested,
    userReceived,
    userRequestFailed
} = actions;

const authRequested = createAction("user/authRequested");
const userUpdateRequested = createAction("user/userUpdateRequested");
const updateUserFailed = createAction("user/updateUserFailed");

const loginMessage = () =>
    toast.success("Вы вошли в аккаунт!", {
        position: "top-center",
        autoClose: 4000
    });

export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            loginMessage();

            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);

                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const signUp =
    ({ payload, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register(payload);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push(redirect);
            loginMessage();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);

                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const loadingUser = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(userReceived(content));
    } catch (error) {
        dispatch(userRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    dispatch(userLoggedOut());
    localStorageService.removeAuthData();

    history.push("/");
};

export function handlingOfBasket(payload) {
    return async function (dispatch) {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.update(payload);
            dispatch(userUpdated(content));
        } catch (error) {
            updateUserFailed(error);
        }
    };
}

export const getUser = () => (state) => state.user.entities || {};
export const getIsAdmin = () => (state) => state.user.entities?.isAdmin;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getAuthErrors = () => (state) => state.user.error;
export const getProductsIdsBasket = () => (state) =>
    state.user.entities?.basket ? state.user.entities.basket : [];
export const getSummPriceOfBasket = () => (state) =>
    state.user.entities?.basket.reduce((a, b) => a + (b.price || 0), 0);
export const getSummCountOfBasket = () => (state) =>
    state.user.entities?.basket.reduce((a, b) => a + (b.count || 0), 0);
export const getProductsInPurchases = () => (state) =>
    state.user.entities?.purchases ? state.user.entities.purchases : [];
export const getSummCountOfPurchases = () => (state) =>
    state.user.entities?.purchases.reduce((a, b) => a + (b.count || 0), 0);

export default usersReducer;
