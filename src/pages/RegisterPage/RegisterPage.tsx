import React, { useEffect, useState } from 'react'
import { RegisterPageProps } from './RegisterPage.interface'
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import CCInputField from '../../atoms/CCInputField'
import CCSelectBox from '../../atoms/CCSelectBox'
import Logo1 from '../../atoms/Logo'
import { Colors, Images } from '../../theme'
import Captcha from '../../components/Captcha/Captcha'
import { v4 as uuidv4 } from 'uuid'
//import CryptoJs from 'crypto-js'
import CryptoJS from 'crypto-js'
import { department } from '../../api/department.api'
import { USER } from '../../api/user.api'
import { setLocalItem } from '../../utils/Storage'
import isEmail from 'validator/lib/isEmail'
import isAlpha from 'validator/lib/isAlpha'
import isMobilePhone from 'validator/lib/isMobilePhone'
import LoaderOverlay from '../../components/LoderOverlay'

const RegisterPage = (props: RegisterPageProps) => {
  const [number, setNumber] = useState<string>('')
  const [password, setPassword] = useState<any>()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaInput, setCaptchInput] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [countryCode, setCountryCode] = useState<any>()
  const [typeOptions, setTypeOptions] = useState<any>([])
  const [selectedRole, setSelectedRole] = useState<any>('')
  const [departmentId, setDepartmentId] = useState<any>()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getDepartment()
  }, [])

  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [])

  useEffect(() => {
    setPassword(null)
    setNumber('')
    setFirstName('')
    setLastName('')
    setEmail('')
  }, [])
  const setCaptchaTokenFromUUID = () => {
    setCaptchaToken(uuidv4())
  }

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
              !['super admin department'].includes(department?.name)
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

  const onBoardingNewUser = async () => {
    if (
      number === '' ||
      number === undefined ||
      password === '' ||
      password === undefined ||
      firstName === '' ||
      firstName === undefined ||
      lastName === '' ||
      lastName === undefined ||
      email === '' ||
      email === undefined ||
      selectedRole === '' ||
      selectedRole === undefined
    ) {
      alert('Fill all the fields!')
      return
    }

    if (!isAlpha(firstName) || !isAlpha(lastName)) {
      alert('Names cannot contain numbers!')
      return
    }

    if (!isEmail(email)) {
      alert('Enter valid email')
      return
    }

    if (!isMobilePhone(number, 'en-IN')) {
      alert('Enter valid mobile number')
      return
    }

    setLoading(true)
    const payload = {
      fullName: firstName + ' ' + lastName,
      email: email,
      phone: Number(number),
      country_code: '91',
      departmentId: departmentId[0]?.label,
      password: CryptoJS.MD5(password).toString(),
      captcha_id: captchaToken,
      captcha: captchaInput,
    }
    USER.onBoardingUser(payload)
      .then((res: any) => {
        if (res?.data?.success) {
          if (res?.data?.data?.alreadyExits) {
            alert('user already exists')
          } else {
            setLocalItem('uuid', res?.data?.data?.uuid)
            navigate(pathNames.TWOFA)
          }
        } else if (!res?.data?.success) {
          alert(res?.data?.error)
          setCaptchaToken(uuidv4())
          setCaptchInput('')
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false)
      })
  }

  const register = () => {
    //alert(JSON.stringify(values))
    // dispatch(registerAction({ roles: ['ISSUER'] })) //calling action from redux
    // authCalls.registerCall()
    //navigate(pathNames.LOGIN, { replace: true })
  }

  const { handleChange, values, errors, handleSubmit } = useForm(register)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {loading ? <LoaderOverlay /> : null}
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ mb: 2, width: '400px' }}>
          <Typography
            sx={{ fontWeight: '700', fontSize: 24, color: '#1C4A43', mt: 3 }}
          >
            Register
          </Typography>
          <Typography sx={{ fontWeight: '500', fontSize: 14 }}>
            Register by providing the information below
          </Typography>
        </Box>

        <Box
          sx={{
            width: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <CCInputField
            label="First Name"
            variant="outlined"
            name="firstName"
            size="small"
            onChange={(e) => setFirstName(e.target.value)}
            error={firstName !== '' && !isAlpha(firstName)}
            helperText={
              firstName !== '' && !isAlpha(firstName) && 'Enter valid Name'
            }
            defaultValue={values?.firstName}
            sx={{ background: '#F5F5F5', mr: 1.5 }}
          />

          <CCInputField
            label="Last Name"
            variant="outlined"
            name="firstName"
            size="small"
            onChange={(e) => setLastName(e.target.value)}
            error={lastName !== '' && !isAlpha(lastName)}
            helperText={
              lastName !== '' && !isAlpha(lastName) && 'Enter valid Name'
            }
            defaultValue={values?.lastName}
            sx={{ background: '#F5F5F5' }}
          />
        </Box>

        <CCInputField
          label="Work Email ID"
          variant="outlined"
          name="email"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
          // error={email !== '' && !isEmail(email)}
          // helperText={email !== '' && !isEmail(email) && 'Enter valid Email ID'}
          defaultValue={values?.email}
          sx={{ width: '400px', mb: 2 }}
        />

        <CCSelectBox
          label="Participant Type"
          // placeholder='Participant Type'
          items={typeOptions}
          onChange={(e) => setSelectedRole(e.target.value)}
          sx={{ width: '400px', mb: 2, background: '#F5F5F5' }}
          fullWidth={false}
          size="small"
        />

        <Box
          sx={{
            width: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <CCSelectBox
            variant="outlined"
            sx={{ background: '#F5F5F5', mr: 1, width: '80px' }}
            name="country_code"
            value={'+91'}
            autoWidth={false}
            items={[{ label: '+91', value: '+91' }]}
            size="small"
          />

          <CCInputField
            label="Phone Number"
            type="number"
            variant="outlined"
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            // error={number !== '' && !isMobilePhone(number, 'en-IN')}
            // helperText={
            //   number !== '' &&
            //   !isMobilePhone(number, 'en-IN') &&
            //   'Enter valid Mobile Number'
            // }
            onChange={(e) => {
              setNumber(e.target.value.toString())
            }}
            onInput={(e) => {
              const InputElement = e.target as HTMLInputElement
              InputElement.value = Math.max(0, parseInt(InputElement.value))
                .toString()
                .slice(0, 10)
            }}
            defaultValue={number}
            sx={{ background: '#F5F5F5', ml: 1.5, pl: 1 }}
          />
        </Box>

        <CCInputField
          label="Password"
          variant="outlined"
          name="password"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={values?.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {!showPassword ? (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={{ width: '400px', mb: 2 }}
        />

        <Captcha
          token={captchaToken}
          captchaInput={captchaInput}
          setCaptchaInput={setCaptchInput}
          setCaptchaToken={setCaptchaToken}
          sx={{ mt: 1 }}
        />

        <CCButton
          // fullWidth=
          type="submit"
          onClick={onBoardingNewUser}
          sx={{
            height: '40px',
            width: '55%',
            borderRadius: '6px',
            marginTop: 2,
          }}
          variant="contained"
        >
          Register
        </CCButton>

        <Box
          justifyContent={'center'}
          display="flex"
          alignItems={'center'}
          sx={{ mt: 2, mb: 2 }}
        >
          <Typography
            sx={{
              marginTop: '20px',
              marginBottom: '15px',
              textAlign: 'center',
              fontSize: 14,
              color: Colors.textColorDarkGreen,
              fontWeight: '500',
            }}
          >{`Already have an account?`}</Typography>
          <Typography
            onClick={() => navigate(pathNames.LOGIN)}
            sx={{
              fontWeight: '500',
              fontSize: 18,
              px: 1,
              cursor: 'pointer',
            }}
          >
            {' '}
            Login{' '}
          </Typography>
          <Typography
            sx={{
              marginTop: '20px',
              marginBottom: '15px',
              textAlign: 'center',
              fontSize: 14,
              color: Colors.textColorDarkGreen,
              fontWeight: '500',
            }}
          >
            {`here`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            sm: 'none',
            xs: 'none',
            lg: 'flex',
          },
          width: '50%',
          height: '100vh',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          flexDirection="column"
          component="img"
          src={Images.illustration1}
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Box>
  )
}

export default RegisterPage
