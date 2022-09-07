import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionAInterface {
  // A1

  total_GHG_emission: string
}

const initialState: SectionAInterface = {
  // A1

  total_GHG_emission: '',
}

const sectionAMonthly = createSlice({
  name: 'sectionAMonthly',
  initialState,
  reducers: {
    // A1 Handlers

    setTotalGHGEmission: (state, action: PayloadAction<any>) => {
      state.total_GHG_emission = action.payload
    },
  },
})

export const { setTotalGHGEmission } = sectionAMonthly.actions

export default sectionAMonthly.reducer
