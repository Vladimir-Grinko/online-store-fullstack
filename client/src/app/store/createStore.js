import catalogReducer from "./catalog";
import goodsReducer from "./goods";
import usersReducer from "./user";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    catalog: catalogReducer,
    goods: goodsReducer,
    user: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
