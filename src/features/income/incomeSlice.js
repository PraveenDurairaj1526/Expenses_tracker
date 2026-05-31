import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION_COUNT } from "../../siteConfig";
import { addIncomeData, fetchAllIncomeData, fetchIncomeData } from "./incomeThunks";
const incomeSlice = createSlice({
    name: 'income',
    initialState: {
        data: [],
        loading: null,
        error: null,
        pagination: {
            totalItem: null,
            totalPages: null,
            limit: PAGINATION_COUNT
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllIncomeData.fulfilled, (state, action) => {
            state.data = action.payload,
                state.loading = false
        })
            .addCase(fetchAllIncomeData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchAllIncomeData.pending, (state, action) => {
                state.loading = true
            })
            // fetch Income
            .addCase(fetchIncomeData.fulfilled, (state, action) => {
                state.data = action.payload.data,
                    state.pagination.totalItem = Number(action.payload.totalItem)
                state.pagination.totalPages = Math.ceil(state.pagination.totalItem / state.pagination.limit)

                state.loading = false
            })
            .addCase(fetchIncomeData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchIncomeData.pending, (state, action) => {
                state.loading = true
            })
            // add income
            .addCase(addIncomeData.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(addIncomeData.rejected, (state, action) => {
                state.error = action.payload
            })

    }
})

export default incomeSlice.reducer