import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IssuanceDataCollectionReducerInterface {
    sectionIndex: number
}
const initialState: IssuanceDataCollectionReducerInterface = {
    sectionIndex: 1
}
const issuanceDataCollection = createSlice({
    name: 'issuanceDataCollection',
    initialState,
    reducers: {
        setSectionIndex: (state, action: PayloadAction<any>) => {
            state.sectionIndex = action.payload
        },
    },
})

export const { setSectionIndex } = issuanceDataCollection.actions

export default issuanceDataCollection.reducer
