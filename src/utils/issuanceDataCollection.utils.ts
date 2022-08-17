import { dataCollectionCalls } from '../api/dataCollectionCalls';
import { setSectionIndex, setSubSectionIndex } from '../redux/Slices/issuanceDataCollection';
import { setNewProjectUUID } from '../redux/Slices/newProjectSlice';
import { store } from '../redux/store'

const dispatch = store.dispatch;

export const moveToNextSection = async (sectionIndex: number, subSectionIndex: number) => {

	//Since List New Project is at 0th index in IssuanceDataCollection
	if (sectionIndex === 0) {
		const newProjectData = store.getState()?.newProject;

		const projectName = newProjectData?.projectName;
		const projectType = newProjectData?.projectType;
		const projectLocation = newProjectData?.projectLocation;
		const startDate = newProjectData?.startDate;
		const projectDuration = newProjectData?.projectDuration;
		const projectArea = newProjectData?.projectArea;

		const payload = {
			company_name: projectName,
			type: projectType[0],
			location: projectLocation,
			start_date: startDate,
			duration: Number(projectDuration),
			area: projectArea
		}
		try {
			const res = await dataCollectionCalls.createNewProject(payload);
			if (res?.success && res?.data?.uuid) {
				dispatch(setNewProjectUUID(res?.data?.uuid))
				dispatch(setSectionIndex(sectionIndex + 1))
				dispatch(setSubSectionIndex(0))
			}
			if (!res?.success && res?.error) {
				alert(res?.error)
			}
		}
		catch (e) {
			console.log("Error in dataCollectionCalls.createNewProject api ~ ", e)
		}
	}
}