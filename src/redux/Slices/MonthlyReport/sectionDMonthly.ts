import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SectionDInterface {
  // D1
  data_and_parameter_fixed_ExAnte: string
  attach_ex_ante_table: any[]
  // D2
  data_and_parameter_monitored_ExPost: ''
  attach_ex_post_table: any[]
  // D3
  briefDescription: string
}

const initialState: SectionDInterface = {
  // D1
  data_and_parameter_fixed_ExAnte: '',
  attach_ex_ante_table: [],
  // D2
  data_and_parameter_monitored_ExPost: '',
  attach_ex_post_table: [],
  // D3
  briefDescription: '',
}

const sectionDMonthly = createSlice({
  name: 'sectionDMonthly',
  initialState,
  reducers: {
    // D1 Handlers
    setDataAndParameterFixedExAnte: (state, action: PayloadAction<any>) => {
      state.data_and_parameter_fixed_ExAnte = action.payload
    },
    setAttachExAnteTable: (state, action: PayloadAction<any>) => {
      state.attach_ex_ante_table = action.payload
    },

    // D2 Handlers
    setDataAndParameterMonitoredExPost: (state, action: PayloadAction<any>) => {
      state.data_and_parameter_monitored_ExPost = action.payload
    },
    setAttachExPostTable: (state, action: PayloadAction<any>) => {
      state.attach_ex_post_table = action.payload
    },

    // D3 Handlers
    setBriefDescription: (state, action: PayloadAction<any>) => {
      state.briefDescription = action.payload
    },
  },
})

export const {
  setAttachExAnteTable,
  setDataAndParameterFixedExAnte,
  setAttachExPostTable,
  setBriefDescription,
  setDataAndParameterMonitoredExPost,
} = sectionDMonthly.actions

export default sectionDMonthly.reducer
