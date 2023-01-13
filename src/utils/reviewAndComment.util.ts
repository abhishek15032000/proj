import { commentsCalls } from '../api/commentsCalls.api'
import { setSections, setSelectedSection } from '../redux/Slices/commentsSlice'
import { store } from '../redux/store'

export const getComments = async () => {
  const sectionIDs = store.getState().comments.sectionIDs
  const project = store.getState().comments.project
  const selectedSectionIndex = store.getState().comments.selectedSectionIndex

  const commentsRes = await Promise.all(
    sectionIDs.map(async (sectionID: any) => {
      if (sectionID) return await getSectionWiseComment(sectionID)
    })
  )

  const sectionsTemp = [
    {
      name: 'Section A',
      id: project?.section_a,
      unreadCount: 0,
      comments: commentsRes[0],
    },
    {
      name: 'Section B',
      id: project?.section_b,
      unreadCount: 0,
      comments: commentsRes[1],
    },
    {
      name: 'Section C',
      id: project?.section_c,
      unreadCount: 0,
      comments: commentsRes[2],
    },
    {
      name: 'Section D',
      id: project?.section_d,
      unreadCount: 0,
      comments: commentsRes[3],
    },
    {
      name: 'Section E',
      id: project?.section_e,
      unreadCount: 0,
      comments: commentsRes[4],
    },
  ]
  store.dispatch(setSections(sectionsTemp))

  //If already some section selected then setting it as selectedSection in redux
  if (selectedSectionIndex || selectedSectionIndex === 0) {
    store.dispatch(setSelectedSection(sectionsTemp[selectedSectionIndex]))
  } else {
    store.dispatch(setSelectedSection(sectionsTemp[0]))
  }
}

const getSectionWiseComment = async (sectionID: string) => {
  const projectID = store.getState().comments.projectID

  try {
    const urlParam = `?project_id=${projectID}&section_id=${sectionID}`
    const res = await commentsCalls.getComments(urlParam)
    return res?.data
  } catch (err) {
    console.log('Error in  commentsCalls.getComments api ~ ', err)
  }
}
