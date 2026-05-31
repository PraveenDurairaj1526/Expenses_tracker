import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteExpenses, fetchAllExpenses, fetchExpenses, getExpenses, postExpenses, updateExpenses } from "../../services/expenses";

export const fetchExpensesData = createAsyncThunk('expenses/fetchExpenses', async ({ page, search }, { rejectWithValue }) => {
    try {
        const res = await fetchExpenses(page, search)
        return { data: res.data, totalItem: res.headers['x-total-count'] }
    } catch (error) {
        return rejectWithValue("fetch failed")
    }
})
export const fetchAllExpensesData = createAsyncThunk('expenses/getAllExpenses', async (_, { rejectWithValue }) => {
    try {
        const res = await fetchAllExpenses()
        return res.data
    } catch (error) {
        rejectWithValue(error.messages || 'fetch failed')
    }
})

export const getExpensesItem = createAsyncThunk('expenses/getExpensesItem', async (id, { rejectWithValue }) => {
    try {
        const res = await getExpenses(id)
        return res.data
    } catch (error) {
        return rejectWithValue("fetch failed")
    }
})

export const postExpensesItem = createAsyncThunk('expenses/postExpensesItem', async (data, { rejectWithValue }) => {
    try {
        const res = await postExpenses(data)
        return res.data
    } catch (error) {
        return rejectWithValue('Post failed')
    }
})

export const updateExpensesItem = createAsyncThunk('expenses/updateExpenses', async ({ id, data }, { rejectWithValue }) => {
    try {
        console.log(data,'hh');
        
        const res = await updateExpenses(id, data)
        return res.data
    } catch (error) {
        return rejectWithValue('update failed')
    }
})

export const deleteExpensesItem = createAsyncThunk('expenses/deleteExpenses', async (id, { rejectWithValue }) => {
    try {
        const res = await deleteExpenses(id)
        return id
    } catch (error) {
        return rejectWithValue('deleting failed')
    }
})