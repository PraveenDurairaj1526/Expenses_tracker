import { createSelector } from "@reduxjs/toolkit";
const getTotalExpenses = (state)=> state.expenses.allExpenses

export const getTotalExpensesAmount = createSelector([getTotalExpenses],((expenses)=> expenses.reduce((acc,value) => acc + value.price,0)))


