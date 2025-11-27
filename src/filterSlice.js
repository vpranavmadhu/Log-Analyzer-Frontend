import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {},
  },
  reducers: {
    setFilters: (state,action) => {
      console.log(action, "this is action filter")
      state.filters = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {setFilters} = filterSlice.actions

export default filterSlice.reducer