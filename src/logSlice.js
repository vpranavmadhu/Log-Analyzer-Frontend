import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
  name: 'logs',
  initialState: {
    logs: [],
  },
  reducers: {
    setLogs: (state,action) => {
      console.log(action, "this is action")
      state.logs = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLogs} = logSlice.actions

export default logSlice.reducer