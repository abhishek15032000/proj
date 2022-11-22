// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'

import CCTable from '../../atoms/CCTable'
import ListOfProjects from '../Projects/ListOfProjects'
import CCSelectBox from '../../atoms/CCSelectBox'
import CCInputField from '../../atoms/CCInputField'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import CCButton from '../../atoms/CCButton'

interface EditProfileProps {
  onChangeInput?: any
  profileDetails?: any
  typeOptions?: any
  setEditProfileVisible?: any
  onSave?: any
  setSelectedRole?: any
  selectedRole?: any
}

const EditProfile: FC<EditProfileProps> = (props) => {
  const {
    onChangeInput,
    profileDetails,
    typeOptions,
    setEditProfileVisible,
    onSave,
    setSelectedRole,
    selectedRole,
  } = props
  return (
    <Paper
      sx={{
        height: '98%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderRadius: '8px',

        mt: 1,
        padding: 2,
        ml: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingX: '15px',
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: Colors.textColorDarkGreen,
            mt: 1,
          }}
        >
          Edit Profile
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
            padding: '10px',
            mt: 2,
          }}
        >
          <CCButtonOutlined
            rounded
            onClick={() => setEditProfileVisible(false)}
            style={{
              width: '40px',
              height: '40px',
              fontSize: 12,
              fontWeight: 500,
              color: '#005046',
              cursor: 'pointer',
              backgroundColor: '#F6F9F7',
              border: 0,
            }}
          >
            Cancel
          </CCButtonOutlined>
          <CCButton
            onClick={() => onSave()}
            rounded
            style={{
              width: '40px',
              height: '40px',
              fontSize: 12,
              fontWeight: 500,
              marginLeft: '10px',
              backgroundColor: '#006B5E',
              color: ' #FFFFFF',
              cursor: 'pointer',
            }}
          >
            Save
          </CCButton>
        </Box>
      </Box>

      <CCInputField
        label=" Name"
        variant="outlined"
        name="firstName"
        size="medium"
        value={profileDetails?.firstname}
        onChange={(e) => onChangeInput('firstname', e.target.value)}
        // error={firstName !== '' && !isAlpha(firstName)}
        // helperText={
        //   firstName !== '' && !isAlpha(firstName) && 'Enter valid Name'
        // }
        defaultValue={profileDetails?.firstName}
        sx={{ background: '#F5F5F5', width: '400px' }}
      />

      <CCInputField
        label="Work Email ID"
        variant="outlined"
        name="firstName"
        size="medium"
        disabled={true}
        value={profileDetails?.email}
        onChange={(e) => onChangeInput('lastname', e.target.value)}
        // error={lastName !== '' && !isAlpha(lastName)}
        // helperText={
        //   lastName !== '' && !isAlpha(lastName) && 'Enter valid Name'
        // }
        defaultValue={profileDetails?.lastName}
        sx={{ background: '#F5F5F5', width: '400px' }}
      />

      <CCSelectBox
        label="Participant Type"
        // placeholder='Participant Type'
        defaultValue={selectedRole}
        items={typeOptions}
        onChange={(e) => setSelectedRole(e.target.value)}
        sx={{ width: '400px', mb: 2, background: '#F5F5F5' }}
        fullWidth={false}
        size="medium"
        disabled={true}
      />

      <Box
        sx={{
          width: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CCSelectBox
          variant="outlined"
          sx={{ background: '#F5F5F5', mr: 1, width: '80px' }}
          name="country_code"
          value={'+91'}
          autoWidth={false}
          items={[{ label: '+91', value: '+91' }]}
          size="medium"
        />

        <CCInputField
          label="Phone Number"
          type="number"
          variant="outlined"
          size="medium"
          value={profileDetails?.mobile}
          inputProps={{
            maxLength: 10,
          }}
          // error={number !== '' && !isMobilePhone(number, 'en-IN')}
          // helperText={
          //   number !== '' &&
          //   !isMobilePhone(number, 'en-IN') &&
          //   'Enter valid Mobile Number'
          // }

          onChange={(e) => onChangeInput('mobile', e.target.value.toString())}
          onInput={(e) => {
            const InputElement = e.target as HTMLInputElement
            InputElement.value = Math.max(0, parseInt(InputElement.value))
              .toString()
              .slice(0, 10)
          }}
          defaultValue={profileDetails?.mobile}
          sx={{ background: '#F5F5F5', ml: 1.5, pl: 1 }}
        />
      </Box>
    </Paper>
  )
}

export default EditProfile
