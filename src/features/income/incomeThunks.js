import { createAsyncThunk } from "@reduxjs/toolkit";
import { addIncome, fetchAllIncome, fetchIncome } from "../../services/income";

export const fetchAllIncomeData = createAsyncThunk('income/fetchAllIncomeDate', async (_, { rejectWithValue }) => {
    try {
        const res = await fetchAllIncome()
        return res.data;
    } catch (err) {
        return rejectWithValue(err.message || 'fetch failed')
    }

})

export const fetchIncomeData = createAsyncThunk('income/fetchIncomeDate', async ({ page,search }, { rejectWithValue }) => {
    try {
        const res = await fetchIncome(page,search)
        return { data: res.data, totalItem: res.headers['x-total-count'] };
    } catch (err) {
        return rejectWithValue(err.message || 'fetch failed')
    }
})

export const addIncomeData = createAsyncThunk('income/addIncomeDate', async ({ data }, { rejectWithValue }) => {
    try {
        const res = await addIncome(data)
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || 'fetch failed')
    }
})