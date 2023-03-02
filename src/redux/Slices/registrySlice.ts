import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeAllItem, setLocalItem } from '../../utils/Storage'

interface RegistryReducerInterface {
  registryProjectDetails: any
}
const initialState: RegistryReducerInterface = {
  registryProjectDetails: null,
}

const registry = createSlice({
  name: 'registry',
  initialState,
  reducers: {
    setRegistryProjectDetails: (state, action: PayloadAction<any>) => {
      state.registryProjectDetails = action.payload
    },
  },
})

export const { setRegistryProjectDetails } = registry.actions

export default registry.reducer
