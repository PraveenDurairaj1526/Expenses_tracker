import { createSelector } from "@reduxjs/toolkit";

const getIncomeData = (state) => state.income.data;

export const getTotalIncomeAmount = createSelector([getIncomeData], (income) => income.reduce((acc, value) => acc + Number(value.amount),0))
