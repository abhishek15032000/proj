import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface sectionEMonthlyInterface {
  //E1
  calculationOfBaselineEmissions: string
  calculationOfBaselineEmissionsImages: []
  //E2
  calculationOfProjectEmissions: string
  calculationOfProjectEmissionsImages: []
  //E3
  calculationOfLeakage: string
  calculationOfLeakageImages: []
  //E4
  calculationSummaryOfEmission: string
  calculationSummaryOfEmissionImages: []
  //E5
  comparisionOfActualEmissionReductions: string
  comparisionOfActualEmissionReductionsImages: []
  //E6
  remarksOnDifferenceFromEstimatedValue: string
  remarksOnDifferenceFromEstimatedValueImages: []
  //E7
  actualEmissionReductions: string
  actualEmissionReductionsImages: []
}

const initialState: sectionEMonthlyInterface = {
  calculationOfBaselineEmissions: '',
  calculationOfBaselineEmissionsImages: [],
  calculationOfProjectEmissions: '',
  calculationOfProjectEmissionsImages: [],
  calculationOfLeakage: '',
  calculationOfLeakageImages: [],
  calculationSummaryOfEmission: '',
  calculationSummaryOfEmissionImages: [],
  comparisionOfActualEmissionReductions: '',
  comparisionOfActualEmissionReductionsImages: [],
  remarksOnDifferenceFromEstimatedValue: '',
  remarksOnDifferenceFromEstimatedValueImages: [],
  actualEmissionReductions: '',
  actualEmissionReductionsImages: [],
}

const sectionEMonthly = createSlice({
  name: 'sectionEMonthly',
  initialState,
  reducers: {
    //E1
    setCalculationOfBaselineEmissions: (state, action: PayloadAction<any>) => {
      state.calculationOfBaselineEmissions = action.payload
    },
    setCalculationOfBaselineEmissionsImages: (
      state,
      action: PayloadAction<any>
    ) => {
      state.calculationOfBaselineEmissionsImages = action.payload
    },
    //E2
    setCalculationOfProjectEmissions: (state, action: PayloadAction<any>) => {
      state.calculationOfProjectEmissions = action.payload
    },
    setCalculationOfProjectEmissionsImages: (
      state,
      action: PayloadAction<any>
    ) => {
      state.calculationOfProjectEmissionsImages = action.payload
    },
    //E3
    setCalculationOfLeakage: (state, action: PayloadAction<any>) => {
      state.calculationOfLeakage = action.payload
    },
    setCalculationOfLeakageImages: (state, action: PayloadAction<any>) => {
      state.calculationOfLeakageImages = action.payload
    },
    //E4
    setCalculationSummaryOfEmission: (state, action: PayloadAction<any>) => {
      state.calculationSummaryOfEmission = action.payload
    },
    setCalculationSummaryOfEmissionImages: (
      state,
      action: PayloadAction<any>
    ) => {
      state.calculationSummaryOfEmissionImages = action.payload
    },
    //E5
    setComparisionOfActualEmissionReductions: (
      state,
      action: PayloadAction<any>
    ) => {
      state.comparisionOfActualEmissionReductions = action.payload
    },
    setComparisionOfActualEmissionReductionsImages: (
      state,
      action: PayloadAction<any>
    ) => {
      state.comparisionOfActualEmissionReductionsImages = action.payload
    },
    //E6
    setRemarksOnDifferenceFromEstimatedValue: (
      state,
      action: PayloadAction<any>
    ) => {
      state.remarksOnDifferenceFromEstimatedValue = action.payload
    },
    setRemarksOnDifferenceFromEstimatedValueImages: (
      state,
      action: PayloadAction<any>
    ) => {
      state.remarksOnDifferenceFromEstimatedValueImages = action.payload
    },
    setActualEmissionReductions: (state, action: PayloadAction<any>) => {
      state.actualEmissionReductions = action.payload
    },
    setActualEmissionReductionsImages: (state, action: PayloadAction<any>) => {
      state.actualEmissionReductionsImages = action.payload
    },
  },
})

export const {
  setCalculationOfBaselineEmissions,
  setCalculationOfBaselineEmissionsImages,
  setCalculationOfProjectEmissions,
  setCalculationOfProjectEmissionsImages,
  setCalculationOfLeakage,
  setCalculationOfLeakageImages,
  setCalculationSummaryOfEmission,
  setCalculationSummaryOfEmissionImages,
  setComparisionOfActualEmissionReductions,
  setComparisionOfActualEmissionReductionsImages,
  setRemarksOnDifferenceFromEstimatedValue,
  setRemarksOnDifferenceFromEstimatedValueImages,
  setActualEmissionReductions,
  setActualEmissionReductionsImages,
} = sectionEMonthly.actions

export default sectionEMonthly.reducer
