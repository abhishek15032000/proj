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

interface ProfileProps {}

const Profile: FC<ProfileProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

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

  const onChangeInput = (e: any, key: any, value: any) => {
    setProfileDetails({ ...profileDetails, [key]: value })
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

          <Grid item xs={12}>
            <ProfileList
              profileDetails={profileDetails}
              setOpenModal={(item: any) => setOpenModal(item)}
              // updateProfile={() => updateProfile()}
              // openProfilePopup={(item: any) => openProfilePopup(item)}
              // removeProfile={(item: any) => removeProfile(item)}
            />
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
            <ProjectList />
            <ProfileTab />
          </Grid>
        </Grid>
        <ForgotPasswordModal
          showModal={openModal}
          setShowModal={setOpenModal}
          setLoading={setLoading}
        />
      </Box>
    )
  }
}

export default Profile
