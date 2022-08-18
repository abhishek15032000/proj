export const deleteIndexInArray = (array: Array<any>, index: number) => {
  const modifiedArray = array.filter((item: any, i: number) => i !== index)

  return modifiedArray
}

export const stringExtractor = (array: any[], fieldName: string) => {
  const modifiedArray = array.map(item => item[fieldName])

  return modifiedArray
}