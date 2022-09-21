import _ from 'lodash'
import { store } from '../redux/store'
//redux:ref(which wil change when updated)
export const isDataModifiedCheckFunc = (
  reduxData: any,
  currentProjectDetailData: any,
  sectionIndex: number,
  subSectionIndex: number
) => {
  console.log(
    'sectionIndex:',
    sectionIndex,
    'subSectionIndex: ',
    subSectionIndex
  )
  let isDataChanged = false
  if (sectionIndex === 1) {
    if (subSectionIndex === 2 || subSectionIndex === 3) {
      console.log('p')
      isDataChanged = arrayObjectTypeCheck(reduxData, currentProjectDetailData)
    } else if (subSectionIndex !== 2 && subSectionIndex !== 3) {
      console.log('pe')
      isDataChanged = stringTypeCheck(reduxData, currentProjectDetailData)
    }
  } else isDataChanged = stringTypeCheck(reduxData, currentProjectDetailData)
  return isDataChanged
}

export const stringTypeCheck = (
  reduxData?: any,
  currentProjectDetail?: any
) => {
  console.log('reduxData: ', reduxData)
  console.log('currentProjectDetail: ', currentProjectDetail)

  const makingKeys = Object.keys(reduxData)
  let isStringDataChanged = false
  console.log('result: ', makingKeys)
  makingKeys.map((key: any) => {
    if (typeof reduxData[key] === 'string' && !currentProjectDetail[key]) {
      //console.log('g', key, '\n', isStringDataChanged)
      if (reduxData[key] !== '') {
        isStringDataChanged = true
        console.log('type string: ', key, '\n', isStringDataChanged)
      }
    } else if (
      typeof reduxData[key] === 'string' &&
      typeof currentProjectDetail[key] === 'string'
    ) {
      if (reduxData[key] !== currentProjectDetail[key]) {
        console.log('not empty')
        isStringDataChanged = true
        console.log('type string: ', key, '\n', isStringDataChanged)
      }
      //console.log('type string: ', key, '\n', isStringDataChanged)
    }
    if (
      !isStringDataChanged &&
      (Array.isArray(reduxData[key]) ||
        Array.isArray(currentProjectDetail[key]))
    ) {
      isStringDataChanged = arrayTypeCheck(
        reduxData[key],
        currentProjectDetail[key]
      )
    }
    if (
      !isStringDataChanged &&
      ((typeof reduxData[key] === 'object' && !Array.isArray(reduxData[key])) ||
        (typeof currentProjectDetail[key] === 'object' &&
          !Array.isArray(currentProjectDetail[key])))
    ) {
      console.log('running')
      isStringDataChanged = objectTypeCheck(
        reduxData[key],
        currentProjectDetail[key]
      )
    }
  })
  return isStringDataChanged
}

export const arrayTypeCheck = (ReduxRow?: any, currentDetailsRow?: any) => {
  let isArrayDataChanged = false
  console.log('l', ReduxRow)
  console.log('currentDetailsRow', currentDetailsRow)

  if (currentDetailsRow.length === 0) {
    if (ReduxRow.length !== 0) {
      isArrayDataChanged = true
      console.log('type array: ', ReduxRow, '\n', isArrayDataChanged)
    }
  } else if (ReduxRow.length !== currentDetailsRow.length) {
    isArrayDataChanged = true
    console.log(
      'type array: ',
      'ReduxRow: ',
      ReduxRow.length,
      currentDetailsRow.length,
      '\n',
      isArrayDataChanged
    )
  } else {
    ReduxRow.map((i: any) => {
      if (!currentDetailsRow.includes(i)) isArrayDataChanged = true
      console.log('type array', i, '\n', isArrayDataChanged)
    })
  }
  //currentDetailsRow.length === 0
  //  ? ReduxRow !== 0 && (isArrayDataChanged = true)
  //  : ReduxRow.length !== currentDetailsRow.length
  //  ? (isArrayDataChanged = true)
  //  : ReduxRow.map((i: any) => {
  //      if (!currentDetailsRow.includes(i)) isArrayDataChanged = true
  //      console.log('type array', i, '\n', isArrayDataChanged)
  //    })
  return isArrayDataChanged
}

export const arrayObjectTypeCheck = (reduxRow: any, currentDetailsRow: any) => {
  console.log('reduxRow: ', reduxRow)
  console.log('currentDetailsRow: ', currentDetailsRow)
  let isArrayObjectDataChanged = false
  currentDetailsRow.length === 0
    ? Object.keys(reduxRow[0]).map((reduxKey: any) => {
        if (reduxKey !== 'flag' && reduxRow[0][reduxKey] !== '')
          isArrayObjectDataChanged = true
        console.log('type string: ', reduxKey, '\n', isArrayObjectDataChanged)
      })
    : reduxRow.length !== currentDetailsRow.length
    ? (isArrayObjectDataChanged = true)
    : Object.keys(reduxRow[0]).map((key: any) => {
        for (let i = 0; i < reduxRow.length; i++) {
          if (key !== 'flag' && reduxRow[i][key] !== currentDetailsRow[i][key])
            isArrayObjectDataChanged = true
          console.log('type array', i, key, '\n', isArrayObjectDataChanged)
        }
      })

  console.log('isArrayObjectDataChanged: ', isArrayObjectDataChanged)

  return isArrayObjectDataChanged
}

export const objectTypeCheck = (reduxRow: any, currentDetailsRow: any) => {
  console.log('ReduxRow: ', reduxRow)
  console.log('currentDetailsRow: ', currentDetailsRow)
  let isObjectTypeModified = false
  Object.keys(reduxRow).map((key: any) => {
    if (!currentDetailsRow) {
      reduxRow[key] !== '' && (isObjectTypeModified = true)
      console.log('type array', key, '\n', isObjectTypeModified)
    } else if (!currentDetailsRow[key] && reduxRow[key] !== '') {
      isObjectTypeModified = true
      console.log('type array', key, '\n', isObjectTypeModified)
    } else if (reduxRow[key] !== currentDetailsRow[key]) {
      isObjectTypeModified = true
      console.log('type array', key, '\n', isObjectTypeModified)
    }
  })
  return isObjectTypeModified
}
