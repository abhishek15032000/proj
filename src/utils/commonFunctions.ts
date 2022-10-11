import { fileUploadCalls } from '../api/fileUpload.api'
import { getLocalItem } from './Storage'

export const deleteIndexInArray = (array: Array<any>, index: number) => {
  const modifiedArray = array.filter((item: any, i: number) => i !== index)

  return modifiedArray
}

export const stringExtractor = (array: any[], fieldName: string) => {
  const modifiedArray = array.map((item) => {
    if (typeof item === 'string') {
      return item
    } else {
      return item[fieldName]
    }
  })

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

export const capitaliseFirstLetter = (sentence: string) => {
  const words = sentence.split(' ')

  const capitaliseSentence = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
  return capitaliseSentence
}

export const limitTitleFromMiddle = (title: string) => {
  if (title?.length) {
    return title.substring(0, 6) + '...' + title.substring(title.length - 6)
  }
  return title
}

export const downloadFile = async (fileName: any) => {
  const File = await fileUploadCalls.getFile(
    fileName,
    getLocalItem('userDetails')?.jwtToken
  )
  const objectURL = URL.createObjectURL(File)

  const link = document.createElement('a')
  link.href = objectURL
  link.setAttribute('download', fileName)

  // Append to html link element page
  document.body.appendChild(link)

  // Start download
  link.click()

  // Clean up and remove the link
  link?.parentNode?.removeChild(link)
}

export const getUrlVars = (url: string) => {
  const urlVarObj: any = {}
  const queryParams: any = new URLSearchParams(location?.search)
  for (const [key, value] of queryParams) {
    urlVarObj[key] = value
  }
  return urlVarObj
}
