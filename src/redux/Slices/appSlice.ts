import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppReducerInterface {
  throughIFrame: boolean
}
const initialState: AppReducerInterface = {
  throughIFrame: false,
}
const app = createSlice({
  name: 'verifier',
  initialState,
  reducers: {
    setThroughIFrame: (state, action: PayloadAction<any>) => {
      state.throughIFrame = action.payload
    },
  },
})

export const { setThroughIFrame } = app.actions

export default app.reducer
