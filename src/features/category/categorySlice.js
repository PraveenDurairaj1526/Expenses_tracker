import { createSlice } from "@reduxjs/toolkit";
import { fetchTableCategoryData, deleteCategoryItem, postCategoryItem, fetchCategoryItem, updateCategoryItem, fetchAllCategoryData } from "./categoryThunks";
import { PAGINATION_COUNT } from "../../siteConfig";


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        data: [],
        error: null,
        categoryItemData: null,
        categoryOptionData: [],
        modalHandlers: {
            mode: "ADD",
            show: false
        },
        pagination: {
            totalItem: null,
            totalPage: null,
            limit: PAGINATION_COUNT
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
        }
    },
    extraReducers: (builder) => {
        // Fetch table CATEGORY
        builder.addCase(fetchTableCategoryData.fulfilled, (state, action) => {
            state.data = action.payload.data,
                state.pagination.totalItem = Number(action.payload.totalItem),
                state.pagination.totalPage = Math.ceil(action.payload.totalItem / state.pagination.limit)
            state.loading = false
        })
            .addCase(fetchTableCategoryData.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchTableCategoryData.rejected, (state, action) => {
                state.loading = false
                state.error = 'fetch failed'
            })
            .addCase(fetchAllCategoryData.fulfilled, (state, action) => {
                state.categoryOptionData = action.payload
            })
            .addCase(fetchAllCategoryData.rejected, (state, action) => {
                state.error = action.payload
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