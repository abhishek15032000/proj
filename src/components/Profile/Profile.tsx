// React Imports
import React, { useEffect, FC, useState } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Modal,
  Stack,
} from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import { useLocation, useNavigate } from 'react-router-dom'
import ProfileTab from './ProfileTab'
import ProfileList from './ProfileList'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import AddIcon from '@mui/icons-material/Add'
import AddAccountDetails from '../IssuerWallet/AddAccountDetailsPopup'
import { issuerCalls } from '../../api/issuerCalls.api'
// import { setAllProfileList } from '../../redux/Slices/allProfileSlice'
import Spinner from '../../atoms/Spinner'
import { getLocalItem } from '../../utils/Storage'
import LoderOverlay from '../LoderOverlay'
import ProjectList from './ProjectList'
import ForgotPasswordModal from '../../pages/LoginPage/ForgotPasswordModal'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { ROLES } from '../../config/constants.config'
import { verifierCalls } from '../../api/verifierCalls.api'
import { getTokensBalance } from '../../utils/tokenRetire.utils'
import { buyerCalls } from '../../api/buyerCalls.api'
import { capitaliseFirstLetter } from '../../utils/commonFunctions'
import EditProfile from './EditProfile'
import { department } from '../../api/department.api'
import { USER } from '../../api/user.api'
import { pathNames } from '../../routes/pathNames'

interface ProfileProps {}

const Profile: FC<ProfileProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

  const [tableData, setTableData] = useState([])

  const [isVisibleAddAccount, setIsVisibleAddAccount] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [profileDetails, setProfileDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    projectType: '',
    mobile: '',
  })

  const [uuid, setUUID] = useState('')
  const [loading, setLoading] = useState(false)
  const [onCallUpdate, setOnCallUpdate] = useState('')
  const { type: userType, email, user_id } = getLocalItem('userDetails')
  const [stats, setStats] = useState<any[] | null>(null)
  const [typeOptions, setTypeOptions] = useState<any>([])
  const [selectedRole, setSelectedRole] = useState<any>('')
  const [departmentId, setDepartmentId] = useState<any>()
  const [editProfileVisible, setEditProfileVisible] = useState(true)
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const accountBalance = useAppSelector(
    ({ wallet }) => wallet.accountBalance,
    shallowEqual
  )

  useEffect(() => {
    getDepartment()
  }, [])

  useEffect(() => {
    fetchingSelectedRoleId()
  }, [selectedRole])

  const fetchingSelectedRoleId = () => {
    const roleId = typeOptions.filter((i: any) => i?.value === selectedRole)
    setDepartmentId(roleId)
  }

  const getDepartment = async () => {
    department
      .getDepartment()
      .then((response: any) => {
        const roles = response?.data
          .filter(
            (department: any) =>
              !['super admin department', 'Credit Buyer'].includes(
                department?.name
              )
          )
          .map((department: any, index: number) => {
            return {
              value: department.name,
              label: department._id,
            }
          })
        setTypeOptions(roles)
      })
      .catch((e) => console.log('Error in department.getDepartment api :', e))
  }

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails').uuid).then((response) => {
      console.log('user', response)
      const tempData = response?.data?.data
      setProfileDetails({
        firstname: tempData?.fullName,
        lastname: tempData?.fullName,
        email: tempData?.email,
        projectType: tempData?.email,
        mobile: tempData?.phone,
      })
    })
  }, [])
  useEffect(() => {
    setLoading(true)

    loadTableData()
    getStats()
  }, [])

  const loadTableData = () => {
    setLoading(true)

    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((response) => {
        setTableData(response.data.data)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const getStats = async () => {
    try {
      setLoading(true)
      let res
      if (userType === ROLES.VERIFIER) {
        res = await verifierCalls.getVerifierProjectDashboardStats(user_id)
        if (res?.success) {
          structureDataForStats(res?.data)
          console.log('res', res)

          setLoading(false)
        }
      }
      //using this for token and contract stats
      else if (userType === ROLES.ISSUER) {
        res = await dataCollectionCalls.getStats()
        if (res?.success) {
          structureDataForStats(res?.data)
          setLoading(false)
        }
      } else if (userType === ROLES.BUYER) {
        getStatsForTokenRetirement()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getStatsForTokenRetirement = async () => {
    // let bal
    // let data
    let apiData
    const bal = await getTokensBalance()
    try {
      const res = await buyerCalls.getStats({
        address: accountAddress,
      })
      if (res?.success) {
        apiData = res?.data
      }
    } catch (err) {
      console.log('Error in buyerCalls.getStats api : ', err)
    } finally {
      setLoading(false)
    }
    let burnTokenCount
    if (apiData?.burn_token_count && apiData?.burn_token_count.length) {
      burnTokenCount = apiData?.burn_token_count?.reduce(
        (prev: any, curr: any) => {
          return (prev += curr?.total)
        },
        0
      )
    }
    const data = {
      data: {
        Total_active_VCOs:
          Math.round(Number(bal?.toString()) * 10 ** -18 * 1000) / 1000,
        Total_retired_VCOs: burnTokenCount,
        Total_VCOT_purchased_so_far: apiData?.purchased_token_count,
        Total_footprint_offset: burnTokenCount,
      },
      success: true,
    }

    structureDataForStats(data?.data)
  }

  const structureDataForStats = (data: any) => {
    //Making dynamic stats objects from rawStatsDataponse
    const keys = Object.keys(data)
    const values = Object.values(data)
    const statsObj = keys.map((key, index) => {
      return {
        title: capitaliseFirstLetter(key.replaceAll('_', ' ')),
        value: values[index],
      }
    })
    setStats(statsObj)
  }

  const onChangeInput = (key: any, value: any) => {
    setProfileDetails({ ...profileDetails, [key]: value })
  }

  const onSave = () => {
    const { firstname, lastname, mobile, projectType, email } = profileDetails
    if (!firstname || !lastname || !mobile || !projectType || !email) {
      alert('Fill all the Fields!')
      return
    }

    setLoading(true)
    const payload = {
      uuid: getLocalItem('userDetails').uuid,
      fullName: firstname + ' ' + lastname,
      email: email,
      phone: Number(mobile),
      departmentId: departmentId[0]?.label,
      country_code: '91',
    }
    console.log('payload', getLocalItem('userDetails'), payload)
    USER.updateUserInfo(payload)
      .then((response) => {
        // navigate(pathNames.DASHBOARD, { replace: true })
        console.log('response<<<<<<', response)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  if (loading) {
    return <LoderOverlay />
  } else {
    return (
      <Box sx={{ p: 0 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: 400, color: Colors.tertiary }}
            >
              {'Profile'}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ProfileList
              profileDetails={profileDetails}
              setOpenModal={(item: any) => setOpenModal(item)}
              accountAddress={accountAddress}
              accountBalance={accountBalance}
              editProfileVisible={editProfileVisible}
              // updateProfile={() => updateProfile()}
              // openProfilePopup={(item: any) => openProfilePopup(item)}
              setEditProfileVisible={(item: any) => setEditProfileVisible(item)}
            />
            {editProfileVisible ? (
              <EditProfile
                profileDetails={profileDetails}
                typeOptions={typeOptions}
                onChangeInput={(key: any, value: any) =>
                  onChangeInput(key, value)
                }
                setEditProfileVisible={(item: any) =>
                  setEditProfileVisible(item)
                }
                setSelectedRole={(item: any) => setSelectedRole(item)}
                onSave={() => onSave()}
              />
            ) : null}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {userType === ROLES.ISSUER && (
              <ProjectList tableData={tableData} loading={loading} />
            )}
            <ProfileTab stats={stats} userType={userType} />
          </Grid>
        </Grid>
        <ForgotPasswordModal
          isChangePassword={true}
          showModal={openModal}
          setShowModal={setOpenModal}
          setLoading={setLoading}
        />
      </Box>
    )
  }
}

export default Profile
