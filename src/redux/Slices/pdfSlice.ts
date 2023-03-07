import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PdfReducerInterface {
  pageCount: number
  pdfData: any
  pageIndexes: any
}
const initialState: PdfReducerInterface = {
  pageCount: -1,
  pdfData: {},
  pageIndexes: {},
}
const pdfPage = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setPageCount: (state, action: PayloadAction<any>) => {
      state.pageCount = action.payload
    },
    setPdfData: (state, action: PayloadAction<any>) => {
      state.pdfData = action.payload
    },
    setPageIndexes: (state, action: PayloadAction<any>) => {
      state.pageIndexes = action.payload
    },
    resetSectionNewProjectDetails: () => initialState,
  },
})

export const { setPageCount, setPdfData, setPageIndexes } = pdfPage.actions

export default pdfPage.reducer
