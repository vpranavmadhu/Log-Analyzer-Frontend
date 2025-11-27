import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
  name: 'logs',
  initialState: {
    logs: [],
    count: 0,
    page : 0,
    rowsPerPage : 10,
  },
  reducers: {
    setLogs: (state,action) => {
      console.log(action, "this is action")
      state.logs = action.payload
    },

    setCount: (state, action) => {
      console.log(action, "this is action for setcount");
      
      state.count = action.payload
    },
    setPage: (state, action) => {
      console.log(action, "this is action for Page");
      
      state.page = action.payload
    },
    setRowsPerPage: (state, action) => {
      console.log(action, "this is action for Page Size");
      
      state.rowsPerPage = action.payload
    },
    
    
  },
})

// Action creators are generated for each case reducer function
export const { setLogs, setCount, setPage, setRowsPerPage} = logSlice.actions

export default logSlice.reducer