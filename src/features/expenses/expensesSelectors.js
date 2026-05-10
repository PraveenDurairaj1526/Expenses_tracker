import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredExpenses = createSelector(
    [(state) => state.expenses.data, (state) => state.expenses.filters.search], (data, search) => {
        if (!search) return data;
        return data?.filter((item) => item?.title.toLowerCase().includes(search.toLowerCase()))
    }
)