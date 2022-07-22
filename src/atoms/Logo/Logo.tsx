import React from 'react'
import { LogoProps } from './Logo.interface'
import logo from '../../assets/Images/logo/logo.svg'
import { Images } from '../../theme'

const Logo = (props: LogoProps) => {
  return <img src={Images.logo} style={{ width: 159.45 }} />
}
export default Logo
