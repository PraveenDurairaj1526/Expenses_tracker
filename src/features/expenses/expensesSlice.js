import { createSlice } from "@reduxjs/toolkit";
import { fetchAllExpenses, getExpensesItem, postExpensesItem, updateExpensesItem, deleteExpensesItem } from "./expensesThunks";
import { PAGINATION_COUNT } from "../../siteConfig";

const expensesSlice = createSlice({
    name: 'expensesSlice',
    initialState: {
        loading: null,
        data: [],
        error: null,
        expensesItem: null,
        modalHandlers: {
            mode: 'ADD', show: false
        },
        pagination: {
            totalItem: null,
            totalPages: 0,
            limit: PAGINATION_COUNT
        }
    },
    reducers: {
        handleExpensesModalOpen(state, action) {
            state.modalHandlers.show = true
            state.modalHandlers.mode = action.payload
        },
        handleExpensesModalClose(state, action) {
            state.modalHandlers.show = false
            state.modalHandlers.mode = 'ADD',
                state.expensesItem = null
        }
    },
    extraReducers: (builder) => {

        // FETCH ALL ITEM
        builder.addCase(fetchAllExpenses.pending, (state, action) => {
            state.loading = true
        })
            .addCase(fetchAllExpenses.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
                state.pagination.totalItem = Number(action.payload.totalItem)
                state.pagination.totalPages = Math.ceil(action.payload.totalItem / state.pagination.limit)
            })
            .addCase(fetchAllExpenses.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // FETCH ITEM
            .addCase(getExpensesItem.fulfilled, (state, action) => {
                state.expensesItem = action.payload
            })
            .addCase(getExpensesItem.rejected, (state, action) => {
                state.error = action.payload
            })

            // POST ITEM
            .addCase(postExpensesItem.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(postExpensesItem.rejected, (state, action) => {
                state.error = action.payload
            })

            // UPDATE ITEM
            .addCase(updateExpensesItem.fulfilled, (state, action) => {
                const index = state.data?.findIndex((item) => item?.id == action.payload.id)
                if (index !== -1) {
                    state.data[index] = action.payload
                }
            })
            .addCase(updateExpensesItem.rejected, (state, action) => {
                state.error = action.payload
            })

            // DELETE ITEM
            .addCase(deleteExpensesItem.fulfilled, (state, action) => {
                const newData = state.data?.filter((item) => item?.id !== action.payload)
                state.data = newData
            })
            .addCase(deleteExpensesItem.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export default expensesSlice.reducer
export const { handleExpensesModalOpen, handleExpensesModalClose } = expensesSlice.actions;