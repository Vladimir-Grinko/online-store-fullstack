import { createSlice } from "@reduxjs/toolkit";
import catalogService from "../services/catalog.service";

const catalogSlice = createSlice({
    name: "catalog",
    initialState: {
        entities: null,
        lastFetch: null,
        error: null,
        isLoading: true
    },
    reducers: {
        catalogRequested: (state) => {
            state.isLoading = true;
        },
        catalogRecieved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        catalogRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: catalogReducer, actions } = catalogSlice;
const { catalogRequested, catalogRecieved, catalogRequestFailed } = actions;

export const loadCatalogList = () => async (dispatch) => {
    dispatch(catalogRequested());
    try {
        const { content } = await catalogService.get();

        dispatch(catalogRecieved(content));
    } catch (error) {
        dispatch(catalogRequestFailed(error.message));
    }
};

export const getCatalogList = () => (state) => state.catalog.entities;
export const getCatalogById = (id) => (state) => {
    if (state.catalog.entities) {
        return state.catalog.entities.find((g) => g.groupId === id);
    }
};

export const getCatalogLoadingStatus = () => (state) => state.catalog.isLoading;

export default catalogReducer;
