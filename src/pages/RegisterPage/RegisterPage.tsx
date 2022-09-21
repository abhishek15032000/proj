import React, { useEffect, useState } from 'react'
import { RegisterPageProps } from './RegisterPage.interface'
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
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
import { Images } from '../../theme'
import Captcha from '../../components/Captcha/Captcha'
import { v4 as uuidv4 } from 'uuid'
//import CryptoJs from 'crypto-js'
import CryptoJS from 'crypto-js'
import { department } from '../../api/department.api'
import { USER } from '../../api/user.api'
import { setLocalItem } from '../../utils/Storage'

const RegisterPage = (props: RegisterPageProps) => {
  const [number, setNumber] = useState<number>()
  const [password, setPassword] = useState<any>()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState()
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaInput, setCaptchInput] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [countryCode, setCountryCode] = useState<any>()
  const [typeOptions, setTypeOptions] = useState<any>([])
  const [selectedRole, setSelectedRole] = useState<any>()
  const [departmentId, setDepartmentId] = useState<any>()

  const navigate = useNavigate()

  useEffect(() => {
    getDepartment()
  }, [])

  useEffect(() => {
    setCaptchaTokenFromUUID()
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
            (department: any) => department.name !== 'super admin department'
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
        }
      })
      .catch((e) => console.log(e))
  }

  const register = () => {
    //alert(JSON.stringify(values))
    // dispatch(registerAction({ roles: ['ISSUER'] })) //calling action from redux
    // authCalls.registerCall()
    //navigate(pathNames.LOGIN, { replace: true })
  }

  const { handleChange, values, errors, handleSubmit } = useForm(register)
  console.log(values)
  return (
    <Grid container flexDirection="row" xs={12} sx={{ height: '100vh' }}>
      <Grid
        item
        lg={6}
        xs={12}
        display="flex"
        flexDirection="column"
        sx={{
          marginTop: 5,
          //width: '100%',
          px: 20,
          flex: 1,
        }}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Logo1 />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontWeight: '700', fontSize: 32, color: '#1C4A43', mt: 3 }}
            >
              Register
            </Typography>
            <Typography sx={{ fontWeight: '500', fontSize: 16 }}>
              Register by providing the information below
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <CCInputField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  //onChange={handleChange}
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={values?.firstName}
                  sx={{ background: '#F5F5F5' }}
                />
              </Grid>
              <Grid item xs={12} md={6} pt={{ xs: 2, md: 0 }}>
                <CCInputField
                  label="Last Name"
                  variant="outlined"
                  name="firstName"
                  //onChange={handleChange}
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={values?.lastName}
                  sx={{ background: '#F5F5F5' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CCInputField
              label="Work Email ID"
              variant="outlined"
              name="email"
              //onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={values?.email}
              sx={{ background: '#F5F5F5' }}
            />
          </Grid>
          <Grid item xs={12}>
            <CCSelectBox
              //fullWidth
              //variant="outlined"
              label="Participant Type"
              items={typeOptions}
              onChange={(e) => setSelectedRole(e.target.value)}
              sx={{ background: '#F5F5F5' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} md={3} pb={{ xs: 2, md: 0 }}>
                <CCSelectBox
                  variant="outlined"
                  sx={{ background: '#F5F5F5' }}
                  // label="Country Code"
                  name="country_code"
                  //onChange={handleChange}
                  //onChange={(e) => console.log('e.target.value')}
                  value={'+91'}
                  autoWidth={false}
                  items={[{ label: '+91', value: '+91' }]}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <CCInputField
                  label="Phone Number"
                  variant="outlined"
                  //onChange={handleChange}
                  onChange={(e) => setNumber(e.target.value)}
                  defaultValue={values?.phoneNumber}
                  sx={{ background: '#F5F5F5' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CCInputField
              label="Password"
              variant="outlined"
              name="password"
              sx={{ background: '#F5F5F5' }}
              //onChange={handleChange}
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
            />
          </Grid>
          <Grid item xs={12}>
            <Captcha
              token={captchaToken}
              captchaInput={captchaInput}
              setCaptchaInput={setCaptchInput}
              setCaptchaToken={setCaptchaToken}
            />
          </Grid>
          <Grid item xs={12}>
            <CCButton
              fullWidth
              type="submit"
              onClick={onBoardingNewUser}
              sx={{
                height: '50px',
                borderRadius: '6px',
                //marginTop: 4,
              }}
              variant="contained"
            >
              Register
            </CCButton>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Typography textAlign={'center'}>
                {`Don't have an account?`}
              </Typography>
              <Typography
                onClick={() => navigate(pathNames.LOGIN)}
                sx={{
                  fontWeight: '500',
                  fontSize: 20,
                  px: 1,
                  cursor: 'pointer',
                }}
              >
                {' '}
                Login{' '}
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 16,
                }}
              >
                {`here`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        flexDirection="column"
        sx={{
          display: {
            lg: 'flex',
            xs: 'none',
          },
          backgroundImage: `url(${Images.illustration1})`,
          flex: 1,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-y',
        }}
      />
    </Grid>
  )
}

export default RegisterPage
