export const deleteIndexInArray = (array: Array<any>, index: number) => {
  const modifiedArray = array.filter((item: any, i: number) => i !== index)

  return modifiedArray
}

export const stringExtractor = (array: any[], fieldName: string) => {
  const modifiedArray = array.map(item => item[fieldName])

  return modifiedArray
}

export const limitTitle = (title: string, limit: number) => {
  const newTitle: Array<any> = []
  if (title?.length > limit) {
    title.split('').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur)
      }
      return acc + cur.length
    }, 0)

    // return the result
    return `${newTitle.join('')} ...`
  }
  return title
}
