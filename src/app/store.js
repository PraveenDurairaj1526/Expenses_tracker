import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from '../features/expenses/expensesSlice.js';
import categoryReducer from '../features/category/categorySlice.js';
export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        category: categoryReducer
    }
})