import React, { useState, useEffect } from 'react'
import Logo from '../../Layouts/Logo/Logo'
import './ResetPassword.css'
import { getUrlVars } from '../../utils/common'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../redux/actions/auth.action'
import { Link, useHistory } from 'react-router-dom'
import { authCalls, encryptionCalls, userCalls } from '../../api/new_apiCalls'
import CryptoJS from 'crypto-js'
import { pathNames } from '../../routes/pathNames'
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton'
import InputField from '../../common/InputField/InputField'
import { uuid } from 'uuidv4'
import Captcha from '../../comps/Captcha/Captcha'

// const captchaToken = uuid();

export default function ResetPassword(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const isUserLoggedIn = useSelector((state) => state.auth.data, shallowEqual)
  const [loading, setloading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [userData, setUserData] = useState(null)
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [captchaInput, setCaptchInput] = useState(undefined)
  const [captchaToken, setCaptchaToken] = useState(uuid())

  useEffect(() => {
    // InitFn();
  }, [])

  // const InitFn = () => {
  //   if (isUserLoggedIn?.loggedInData) {
  //     dispatch(logoutAction())
  //     window.location.reload()
  //     return
  //   }
  //   if (props.location.search.includes('token')) {
  //     const data = getUrlVars(props.location.search)
  //     setUserData(data)
  //     encryptionCalls.verifyToken({ token: data?.token }).then((res) => {
  //       if (!res.success) {
  //         alert('Link Expired')
  //         history.replace(pathNames.LOGIN)
  //       }
  //     })
  //   }
  // }

  const callResetPasswordFn = async () => {
    // window.location.reload('/')
    if (newPassword.length == 0) {
      alert('Please type a password')
      return
    }
    setloading(true)

    userData.newPassword = CryptoJS.MD5(newPassword).toString()
    userData.captcha = captchaInput
    userData.id = captchaToken

    try {
      let res = await userCalls.USER.resetPassword(userData)
      if (res.success && res.data) {
        alert('Your New Password has been set successfully')
        // window.location.reload('/login')
        history.replace(pathNames.LOGIN)
        setloading(false)
      } else {
        setCaptchaToken(uuid())
        alert(res.error)
        setloading(false)
      }
    } catch (e) {
      setCaptchaToken(uuid())
      alert('Something went wrong!')
      setloading(false)
    }
  }

  const checkPassword = (e) => {
    if (newPassword != e.target.value) {
      setConfirmNewPassword('')
      alert('Entered passwords do not match. Please try again!')
    }
  }

  return (
    <div className="container-fluid">
      <div className="pt-5">
        <Logo />
      </div>
      {userData?.token ? (
        <div
          className="row justify-content-center align-items-center py-5"
          id="loginForm"
        >
          <div className="col-lg-12 col-sm-8">
            <div className="row justify-content-center align-items-center ">
              <div className="col-lg-5">
                <div className=" login-form  p-5">
                  <div className="form p-3 text-left">
                    <h3>Reset Password</h3>
                    <div className="form-group fuj_form_group pt-4">
                      <div className="col-md-12 pl-1 pr-0">
                        <InputField
                          placeholder={'Enter New Password'}
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-12 pl-1 pr-0">
                        <InputField
                          placeholder={'Confirm New Password'}
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          onBlur={(e) => checkPassword(e)}
                          required
                        />
                      </div>
                    </div>

                    <Captcha
                      // captchaImg={captchaImg}
                      captchaInput={captchaInput}
                      // captchaVerified={captchaVerified}
                      setCaptchaInput={setCaptchInput}
                      token={captchaToken}
                      setCaptchaToken={setCaptchaToken}
                      // getCaptcha={getCaptcha}
                    />

                    {/* <div className="d-flex  align-items-center  flex-column col-12 mt-4" style={{ marginTop: '2rem' }}> */}
                    <div>
                      <PrimaryButton
                        isInCorner={false}
                        label={`${
                          loading ? 'Please Wait...' : 'Reset Password'
                        }`}
                        disabled={
                          newPassword.length == 0 ||
                          confirmNewPassword.length == 0 ||
                          newPassword != confirmNewPassword ||
                          loading
                        }
                        onClick={callResetPasswordFn}
                      />
                      {/* </div> */}
                    </div>

                    <div className="col-lg-12 text-center mt-3">
                      <small style={{ color: '#c09071', fontSize: 14 }}>
                        <Link
                          to="/"
                          style={{ color: '#473122', fontWeight: '500' }}
                        >
                          Sign In
                        </Link>
                      </small>
                    </div>
                  </div>
                </div>

                {/* <div className="row justify-content-center align-items-start mt-3">

                  </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* <div style={{ height: "15vw" }} /> */}
          <div className="mt-5 text-center" style={{ fontSize: '25px' }}>
            Please Go to Reset Password Link and Try Again!
          </div>
        </>
      )}
    </div>
  )
}
