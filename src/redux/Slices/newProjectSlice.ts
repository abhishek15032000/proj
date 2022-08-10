import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NewProjectReducerInterface {
  startDate: Date | null
  projectType: string[]
  projectName: string
  projectLocation: string
  projectDuration: string
  projectArea: number | null

  //Will get from create new project call
  newProjectUUID: string
}
const initialState: NewProjectReducerInterface = {
  projectName: "",
  projectType: [],
  projectLocation: "",
  startDate: null,
  projectDuration: "",
  projectArea: null,

  //Will get from create new project call
  newProjectUUID: "",
}
const newProject = createSlice({
  name: 'newProject',
  initialState,
  reducers: {
    setProjectName: (state, action: PayloadAction<any>) => {
      state.projectName = action.payload
    },
    setProjectType: (state, action: PayloadAction<any>) => {
      state.projectType = action.payload
    },
    setProjectLocation: (state, action: PayloadAction<any>) => {
      state.projectLocation = action.payload
    },
    setStartDate: (state, action: PayloadAction<any>) => {
      state.startDate = action.payload
    },
    setProjectDuration: (state, action: PayloadAction<any>) => {
      state.projectDuration = action.payload
    },
    setProjectArea: (state, action: PayloadAction<any>) => {
      state.projectArea = action.payload
    },
    setNewProjectUUID: (state, action: PayloadAction<any>) => {
      state.newProjectUUID = action.payload
    },
  },
})

export const { setStartDate, setProjectType, setProjectName, setProjectLocation, setProjectDuration, setProjectArea, setNewProjectUUID } = newProject.actions

export default newProject.reducer