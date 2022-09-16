import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionCInterface {
  // C1
  monitoringSystem: string
  monitoringPlan: string
  organizationalChartImage: Array<any>
  datasMonitored: string
}

const initialState: SectionCInterface = {
  // C1
  monitoringSystem: '',
  monitoringPlan: '',
  organizationalChartImage: [],
  datasMonitored: '',
}

const sectionCMonthly = createSlice({
  name: 'sectionCMonthly',
  initialState,
  reducers: {
    // C1 Handlers
    setMonioringSystem: (state, action: PayloadAction<any>) => {
      state.monitoringSystem = action.payload
    },
    setMonitoringPlan: (state, action: PayloadAction<any>) => {
      state.monitoringPlan = action.payload
    },
    setOrganizationalChartImage: (state, action: PayloadAction<any>) => {
      state.organizationalChartImage = action.payload
    },
    setDatasMonitored: (state, action: PayloadAction<any>) => {
      state.datasMonitored = action.payload
    },
  },
})

export const {
  setMonioringSystem,
  setMonitoringPlan,
  setOrganizationalChartImage,
  setDatasMonitored,
} = sectionCMonthly.actions

export default sectionCMonthly.reducer
