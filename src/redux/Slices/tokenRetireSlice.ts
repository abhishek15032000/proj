import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TokenRetireReducerInterface {
  ongoingApproveTokenRetirement: any
}
const initialState: TokenRetireReducerInterface = {
  ongoingApproveTokenRetirement: null,
}
const tokenRetire = createSlice({
  name: 'tokenRetire',
  initialState,
  reducers: {
    setOngoingApproveTokenRetirement: (state, action: PayloadAction<any>) => {
      state.ongoingApproveTokenRetirement = action.payload
    },
  },
})

export const { setOngoingApproveTokenRetirement } = tokenRetire.actions

export default tokenRetire.reducer
