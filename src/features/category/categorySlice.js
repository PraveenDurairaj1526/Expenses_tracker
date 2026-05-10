import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategoryData, deleteCategoryItem, postCategoryItem, fetchCategoryItem, updateCategoryItem } from "./categoryThunks";


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        data: [],
        error: null,
        categoryItemData: null,
        modalHandlers: {
            mode: "ADD",
            show: false
        },
        filterOptions: {
            searchValue: ''
        }
    },
    reducers: {
        handleCategoryModalOpen(state, action) {
            state.modalHandlers.show = true,
            state.modalHandlers.mode = action.payload
        },
        handleCategoryModalClose(state) {
            state.modalHandlers.show = false,
                state.categoryItemData = null,
                state.modalHandlers.mode = "ADD"
        },
        setCategorySearch(state, action) {
            state.filterOptions.searchValue = action.payload
        }
    },
    extraReducers: (builder) => {
        // Fetch ALL CATEGORY
        builder.addCase(fetchAllCategoryData.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
            .addCase(fetchAllCategoryData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllCategoryData.rejected, (state, action) => {
                state.loading = false
                state.error = 'fetch failed'
            })
            //FETCH ITEM
            .addCase(fetchCategoryItem.fulfilled, (state, action) => {
                state.categoryItemData = action.payload
            })
            .addCase(fetchCategoryItem.rejected, (state, action) => {
                state.error = action.payload
            })
            // ADD
            .addCase(postCategoryItem.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(postCategoryItem.rejected, (state, action) => {
                state.error = action.payload
            })
            // UPDATE
            .addCase(updateCategoryItem.fulfilled, (state, action) => {
                const updateItemIndex = state.data.findIndex((el) => el.id === action.payload.id)
                if (updateItemIndex !== -1) {
                    state.data[updateItemIndex] = action.payload
                }
            })
            .addCase(updateCategoryItem.rejected, (state, action) => {
                state.error = action.payload
            })
            // DELETE 
            .addCase(deleteCategoryItem.fulfilled, (state, action) => {
                const newCategoryList = state.data?.filter((el) => el.id !== action.payload)
                state.data = newCategoryList
            })
            .addCase(deleteCategoryItem.rejected, (state, action) => {
                state.error = 'delete failed'
            })
    }

})

export default categorySlice.reducer
export const { handleCategoryModalOpen, handleCategoryModalClose, setCategorySearch } = categorySlice.actions