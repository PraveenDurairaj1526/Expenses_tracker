import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTableCategory, fetchCategory, postCategory, updateCategory, deleteCategory, fetchAllCategory } from "../../services/category";

export const fetchTableCategoryData = createAsyncThunk('category/fetchTableCategory', async ({ page, search }, { rejectWithValue }) => {
    try {
        const res = await fetchTableCategory(page, search)
        return { data: res.data, totalItem: res.headers['x-total-count'] }
    } catch (error) {
        return rejectWithValue(error.message || "fetch failed")
    }
})

export const fetchCategoryItem = createAsyncThunk('category/fetchCategory', async (id, { rejectWithValue }) => {
    try {
        const res = await fetchCategory(id)
        return res.data
    } catch (error) {
        return rejectWithValue('fetch failed')
    }
})

export const postCategoryItem = createAsyncThunk('category/postCategory', async (data, { rejectWithValue }) => {
    try {
        const res = await postCategory(data)
        return res.data;
    } catch (error) {
        return rejectWithValue('post failed')
    }
})

export const updateCategoryItem = createAsyncThunk('category/updateCategory', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await updateCategory(id, data)
        return res.data
    } catch (error) {
        return rejectWithValue('update failed')
    }
})

export const deleteCategoryItem = createAsyncThunk('category/deleteCategory', async (id, { rejectWithValue }) => {
    try {
        const res = await deleteCategory(id);
        return id
    } catch (error) {
        return rejectWithValue(error.message || 'delete failed')
    }
})

export const fetchAllCategoryData = createAsyncThunk('category/fetchAllCategory', async (_, { rejectWithValue }) => {
    try {
        const res = await fetchAllCategory()
        return res.data
    } catch (error) {
        return rejectWithValue(error.message || 'fetch failed')
    }
})