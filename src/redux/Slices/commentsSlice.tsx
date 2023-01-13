import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CommentsReducerInterface {
  projectID: string
  project: any
  sectionIDs: any
  sections: any
  selectedSection: any
  selectedSectionIndex: any
  comment: string
  commentFrom: string
  commentTo: string
  sectionAComments: any
  sectionBComments: any
  sectionCComments: any
  sectionDComments: any
  sectionEComments: any
}
const initialState: CommentsReducerInterface = {
  projectID: '',
  project: null,
  sectionIDs: null,
  sections: null,
  selectedSection: null,
  selectedSectionIndex: null,
  comment: '',
  commentFrom: '',
  commentTo: '',
  sectionAComments: null,
  sectionBComments: null,
  sectionCComments: null,
  sectionDComments: null,
  sectionEComments: null,
}
const comments = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProjectID: (state, action: PayloadAction<any>) => {
      state.projectID = action.payload
    },
    setProject: (state, action: PayloadAction<any>) => {
      state.project = action.payload
    },
    setSectionIDs: (state, action: PayloadAction<any>) => {
      state.sectionIDs = action.payload
    },
    setSections: (state, action: PayloadAction<any>) => {
      state.sections = action.payload
    },
    setSelectedSection: (state, action: PayloadAction<any>) => {
      state.selectedSection = action.payload
    },
    setSelectedSectionIndex: (state, action: PayloadAction<any>) => {
      state.selectedSectionIndex = action.payload
    },
    setComment: (state, action: PayloadAction<any>) => {
      state.comment = action.payload
    },
    setCommentFrom: (state, action: PayloadAction<any>) => {
      state.commentFrom = action.payload
    },
    setCommentTo: (state, action: PayloadAction<any>) => {
      state.commentTo = action.payload
    },
    setSectionAComments: (state, action: PayloadAction<any>) => {
      state.sectionAComments = action.payload
    },
    setSectionBComments: (state, action: PayloadAction<any>) => {
      state.sectionBComments = action.payload
    },
    setSectionCComments: (state, action: PayloadAction<any>) => {
      state.sectionCComments = action.payload
    },
    setSectionDComments: (state, action: PayloadAction<any>) => {
      state.sectionDComments = action.payload
    },
    setSectionEComments: (state, action: PayloadAction<any>) => {
      state.sectionEComments = action.payload
    },
  },
})

export const {
  setProjectID,
  setProject,
  setSections,
  setSelectedSectionIndex,
  setSelectedSection,
  setComment,
  setCommentFrom,
  setCommentTo,
  setSectionIDs,
} = comments.actions

export default comments.reducer
