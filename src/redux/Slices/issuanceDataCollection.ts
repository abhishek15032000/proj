import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IssuanceDataCollectionReducerInterface {
  sectionIndex: number
  subSectionIndex: number
}
const initialState: IssuanceDataCollectionReducerInterface = {
  sectionIndex: 2,
  subSectionIndex: 0,
}
const issuanceDataCollection = createSlice({
  name: 'issuanceDataCollection',
  initialState,
  reducers: {
    setSectionIndex: (state, action: PayloadAction<any>) => {
      state.sectionIndex = action.payload
    },
    setSubSectionIndex: (state, action: PayloadAction<any>) => {
      state.subSectionIndex = action.payload
    },
  },
})

export const { setSectionIndex, setSubSectionIndex } = issuanceDataCollection.actions

export default issuanceDataCollection.reducer
