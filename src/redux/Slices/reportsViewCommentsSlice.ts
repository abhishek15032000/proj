import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface reportsViewCommentsReducerInterface {
  reportDetails: any
}

const initialState: reportsViewCommentsReducerInterface = {
  reportDetails: null,
}

const reportsViewComments = createSlice({
  name: 'reportsViewComments',
  initialState,
  reducers: {
    setReportDetails: (state, action: PayloadAction<any>) => {
      state.reportDetails = action.payload
    },
  },
})

export const { setReportDetails } = reportsViewComments.actions

export default reportsViewComments.reducer
