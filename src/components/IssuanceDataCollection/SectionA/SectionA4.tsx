import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import CCButton from '../../../atoms/CCButton'
import CCInputField from '../../../atoms/CCInputField'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setMethodologies } from '../../../redux/Slices/sectionASlice'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import Spinner from '../../../atoms/Spinner'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

interface methodologiesInterface {
  approvedMethodologies: string
  projectType: string
  category: string
  version: string
  toolsReferred: string
}

const SectionA4 = () => {
  const dispatch = useAppDispatch()
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }

  useEffect(() => {
    if (currentProjectDetails.section_a.step4.completed) {
      const { methodologies } = currentProjectDetails.section_a.step4
      let step4Data = []
      step4Data = methodologies.map((item: any) => {
        return {
          methodology: item.methodology,
          project_type: item.project_type,
          category: item.category,
          version: item.version,
          tools: item.tools,
          flag: false,
        }
      })
      dispatch(setMethodologies(step4Data))
    }
  }, [])

  const methodologies = useAppSelector(
    ({ sectionA }) => sectionA.methodologies,
    shallowEqual
  )
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const addMethodology = () => {
    const methodologiesCopy = [...methodologies]
    methodologiesCopy.push({
      methodology: '',
      project_type: [],
      category: '',
      version: '',
      tools: '',
      flag: false,
    })
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleTextChange = (e: any, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleDropDownChange = (e: boolean, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleDelete = (
    e: React.MouseEvent,
    value: string,
    index: number,
    type: string
  ) => {
    const methodologiesCopy = [...methodologies]

    const filterTypes = methodologiesCopy[index]?.project_type.filter(
      (item: any) => item !== value && item
    )
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: filterTypes }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const projectTypes = [
    'Agriculture',
    'Chemical industries',
    'Construction',
    'Energy distribution',
    'Energy demand',
    ' Energy industries (renewable - / non-renewable sources)',
    'Fugitive emissions from fuels (solid, oil and gas)',
    ' Fugitive emissions from production and consumption of halocarbons and sulphur hexafluoride',
    ' Livestock, enteric fermentation, and manure management',
    ' Manufacturing industries',
    ' Metal production',
    'Mining/mineral production',
    'Solvent use',
    ' Transport',
    'Waste handling and disposal',
    'Afforestation and reforestation',
    'Forestry and Other Land Use',
    'Forest conservation (REDD+)',
    ' Blue carbon',
  ]
  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <>
      <Typography sx={{ mt: 3 }}>
        The methodologies applied for the project activity under consideration
        are* -
      </Typography>

      {methodologies.map((item, index) => (
        <Grid
          key={index}
          container
          sx={{
            border: ' 1px solid #1d4b44',
            borderRadius: '8px',
            padding: '20px',
            marginY: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingX: '5px',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{ width: '100%', marginY: '10px', marginLeft: '-10pn' }}
            >
              Methodology {index + 1}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => handleDropDownChange(!item?.flag, index, 'flag')}
            >
              {item?.flag ? <ArrowDropUp /> : <ArrowDropDown />}
            </Box>
          </Box>
          {item?.flag && (
            <>
              <Grid
                item
                sx={{ mt: 2 }}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                rowSpacing={1}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Methodology *
                  </InputLabel>
                  <Select
                    placeholder="Select Approved Methodologies"
                    sx={{
                      background: 'white',
                      color: '#006B5E',
                      borderRadius: '4px 4px 0 0',
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Methodology *"
                    value={item?.methodology}
                    onChange={(e) => handleTextChange(e, index, 'methodology')}
                  >
                    <MenuItem
                      value={'AMS-I.A'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.A
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.B'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.B
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.C'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.C
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.D'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.D
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.E'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.E
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.F'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.F
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.G'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.G
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.H'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.H
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.I'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.I
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.J'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.J
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.K'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.K
                    </MenuItem>
                    <MenuItem
                      value={'AMS-I.L'}
                      sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                    >
                      AMS-I.L
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                sx={{ mt: 1 }}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                rowSpacing={1}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Project Type *
                  </InputLabel>
                  <Select
                    multiple
                    value={item?.project_type}
                    onChange={(e) => handleTextChange(e, index, 'project_type')}
                    input={
                      <OutlinedInput
                        sx={{
                          color: '#006B5E',
                        }}
                        label="Project Type"
                      />
                    }
                    sx={{
                      color: '#006B5E',
                      borderRadius: '4px 4px 0 0',
                    }}
                    renderValue={(selected: any) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: any) => (
                          <Chip
                            sx={{
                              display: 'flex',
                              backgroundColor: '#1D4B44',
                              color: '#fff',
                              borderRadius: '16px',
                              fontSize: 14,
                              py: 1,
                              px: 2,
                            }}
                            key={value}
                            label={value}
                            clickable
                            deleteIcon={
                              <CancelPresentationIcon
                                style={{ color: 'white', marginLeft: 1 }}
                                onMouseDown={(event) => event.stopPropagation()}
                              />
                            }
                            onDelete={(e) =>
                              handleDelete(e, value, index, 'project_type')
                            }
                            onClick={() => console.log('clicked chip')}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {projectTypes.map((item2) => (
                      <MenuItem key={item2} value={item2}>
                        <Checkbox
                          checked={item?.project_type?.includes(item2)}
                        />
                        <ListItemText primary={item2} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                sx={{ mt: 1 }}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                rowSpacing={1}
              >
                <CCInputField
                  label="Category"
                  placeholder="Enter Category of Project Type"
                  value={item?.category}
                  onChange={(e) => handleTextChange(e, index, 'category')}
                  sx={{ background: 'white' }}
                />
              </Grid>
              <Grid
                item
                sx={{ mt: 1 }}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                rowSpacing={1}
              >
                <CCInputField
                  label="Version"
                  placeholder="Enter version of the baseline and monitoring methodology"
                  value={item?.version}
                  onChange={(e) => handleTextChange(e, index, 'version')}
                  sx={{ background: 'white' }}
                  type="number"
                />
              </Grid>
              <Grid
                item
                sx={{ mt: 1 }}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                rowSpacing={1}
              >
                <CCInputField
                  label="Tools referred"
                  placeholder="Enter tools to calculate or determine the baseline and monitoring methodology"
                  value={item?.tools}
                  onChange={(e) => handleTextChange(e, index, 'tools')}
                  sx={{ background: 'white' }}
                  type="number"
                />
              </Grid>
            </>
          )}
        </Grid>
      ))}
      <Grid item sx={{ mt: 2 }} xs={12} md={12} lg={12} xl={12} rowSpacing={1}>
        <CCButton
          sx={{
            backgroundColor: '#F6F9F7',
            padding: '8px 15px',
            borderRadius: '20px',
            color: '#006B5E',
          }}
          variant="contained"
          onClick={addMethodology}
        >
          + Add More Methodology
        </CCButton>
        <HelpPopUp
          modal={modal}
          setModal={(item: any) => setModal(item)}
          data={IssuanceHelpContentData?.A4}
          issuanceVisible={true}
        />
      </Grid>
    </>
  )
}

export default SectionA4
