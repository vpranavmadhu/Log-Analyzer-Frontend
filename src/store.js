import { configureStore } from '@reduxjs/toolkit'
import logsReducer from './logSlice'
import  filterReducer  from './filterSlice'

export const store = configureStore({
  reducer: {
    logStore: logsReducer,
    filterStore: filterReducer,
  },
})