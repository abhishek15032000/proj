import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeAllItem, setLocalItem } from '../../utils/Storage'

interface AuthReducerInterface {
  loggedIn: boolean
  data: any
}
const initialState: AuthReducerInterface = {
  loggedIn: false,
  data: null,
}
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<any>) => {
      state.loggedIn = true
      state.data = { roles: [action.payload?.type] }
      setLocalItem('loggedIn', { roles: [action.payload?.type] })
      setLocalItem('userDetails', action.payload)
    },
    logoutAction: () => {
      // removeAllItem()
      // localStorage.removeItem('persist:root')
      localStorage.removeItem('userDetails')
      localStorage.removeItem('profileCompleted')
      localStorage.removeItem('userDetails2')
      localStorage.removeItem('loggedIn')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
  },
})

export const { loginAction, logoutAction } = auth.actions

export default auth.reducer
