import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCategory, fetchCategory, postCategory, updateCategory, deleteCategory } from "../../services/category";

export const fetchAllCategoryData = createAsyncThunk('category/fetchAllCategory', async (page, { rejectWithValue }) => {
    try {
        const res = await fetchAllCategory(page)
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