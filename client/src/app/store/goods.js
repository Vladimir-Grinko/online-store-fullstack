import { createSlice, createAction } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const goodsSlice = createSlice({
    name: "goods",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        goodsRequested: (state) => {
            state.isLoading = true;
        },
        goodsRecieved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        goodsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productCreated: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        productUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: goodsReducer, actions } = goodsSlice;
const {
    goodsRequested,
    goodsRecieved,
    goodsRequestFiled,
    productCreated,
    productUpdateSuccessed,
    productRemoved
} = actions;

const addProductRequested = createAction("products/addProductRequested");
const updataProductRequested = createAction("products/updataProductRequested");
const productUpdateFailed = createAction("products/productUpdateFailed");
const removeProductRequested = createAction("products/removeProductRequested");

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadGoodsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().goods;
    if (isOutdated(lastFetch)) {
        dispatch(goodsRequested());
        try {
            const { content } = await productsService.get();

            dispatch(goodsRecieved(content));
        } catch (error) {
            dispatch(goodsRequestFiled(error.message));
        }
    }
};

export const createProduct = (data) => async (dispatch) => {
    dispatch(addProductRequested());

    try {
        const { content } = await productsService.create(data);
        dispatch(productCreated(content));
    } catch (error) {
        dispatch(goodsRequestFiled(error.message));
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(updataProductRequested());

    try {
        const { content } = await productsService.update(payload);
        dispatch(productUpdateSuccessed(content));
    } catch (error) {
        dispatch(productUpdateFailed(error.message));
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(removeProductRequested());

    try {
        const { content } = await productsService.delete(id);

        if (!content) {
            dispatch(productRemoved(id));
        }
    } catch (error) {
        dispatch(goodsRequestFiled(error.message));
    }
};

export const getGoods = () => (state) => state.goods.entities;
export const getGoodsLoadingStatus = () => (state) => state.goods.isLoading;

export const getProductById = (productId) => (state) => {
    if (state.goods.entities) {
        return state.goods.entities.find((prod) => prod._id === productId);
    }
    return {};
};

export default goodsReducer;
