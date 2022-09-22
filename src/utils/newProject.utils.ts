export const calSectionPercent = (data: any) => {
  const temp = Object.values(data)
  const tempChild = temp.filter(
    (i) => typeof i === 'object' && !Array.isArray(i) && i !== null
  )
  //Sections with only steps object
  const filteringTrue = tempChild.filter((i: any) => i?.completed === true)
  const calPercentage = (filteringTrue.length / tempChild.length) * 100
  return Math.round(calPercentage)
}

export const addSectionPercentages = (row: any) => {
  row.section_a.completionPercentage = calSectionPercent(row.section_a)
  row.section_b.completionPercentage = calSectionPercent(row.section_b)
  row.section_c.completionPercentage = calSectionPercent(row.section_c)
  row.section_d.completionPercentage = calSectionPercent(row.section_d)
  row.section_e.completionPercentage = calSectionPercent(row.section_e)

  if (
    row?.section_a?.completionPercentage === 100 &&
    row?.section_b?.completionPercentage === 100 &&
    row?.section_c?.completionPercentage === 100 &&
    row?.section_d?.completionPercentage === 100 &&
    row?.section_e?.completionPercentage === 100
  )
    row.projectCompleted = true
  return row
}

export const isProjectCompleted = (row: any, index?: any) => {
  row.section_a.completionPercentage = calSectionPercent(row.section_a)
  row.section_b.completionPercentage = calSectionPercent(row.section_b)
  row.section_c.completionPercentage = calSectionPercent(row.section_c)
  row.section_d.completionPercentage = calSectionPercent(row.section_d)
  row.section_e.completionPercentage = calSectionPercent(row.section_e)
  
  if (
    row?.section_a?.completionPercentage === 100 &&
    row?.section_b?.completionPercentage === 100 &&
    row?.section_c?.completionPercentage === 100 &&
    row?.section_d?.completionPercentage === 100 &&
    row?.section_e?.completionPercentage === 100
  ) {
    return true
  } else {
    return false
  }
}
