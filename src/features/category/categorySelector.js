import { createSelector } from "@reduxjs/toolkit";

export const categoryFilteredData = createSelector([(state) => state.category.data, (state) => state.category.filterOptions.searchValue], (data, search) => {
    if (!search) return data
    if (search) {
        return data?.filter((item) => item.categoryName.toLowerCase().includes(search.toLowerCase()))
    }
})