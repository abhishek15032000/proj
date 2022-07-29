import React from 'react'
import { LogoProps } from './Logo.interface'
import logo from '../../assets/Images/logo/logo.svg'
import { Images } from '../../theme'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import './style.css'

const Logo = ({ width = 159.45 }: LogoProps) => {
  const navigate = useNavigate()
  return (
    <img
      className="logoImage"
      src={Images.logo}
      style={{ width }}
      onClick={() => navigate(pathNames.DASHBOARD)}
    />
  )
}
export default Logo
