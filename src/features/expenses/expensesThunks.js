import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteExpenses, fetchExpenses, getExpenses, postExpenses, updateExpenses } from "../../services/expenses";

export const fetchAllExpenses = createAsyncThunk('expenses/fetchAllExpenses', async (page, { rejectWithValue }) => {
    try {
        const res = await fetchExpenses(page)
        return { data: res.data, totalItem: res.headers['x-total-count'] }
    } catch (error) {
        return rejectWithValue("fetch failed")
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