// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, Paper, IconButton, Badge } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

// Functional Imports
import { NOTIFICATION } from '../../../api/notifications.api'
import { getLocalItem } from '../../../utils/Storage'

// Local Imports
import NotificationList from '../../../atoms/NotificationList'

interface NotificationIconProps {}

const NotificationIcon = (props: NotificationIconProps) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    updateNotificationCount()
  }, [])

  const updateNotificationCount = () => {
    setInterval(() => {
      NOTIFICATION.getNotification(getLocalItem('userDetails')?.email).then(
        (response) => {
          let count: any = 0

          response.data?.data?.map((item: any) => {
            if (!item.inAppRead) {
              count++
            }
          })

          setNotificationCount(count)
        }
      )
    }, 10000)
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="primary"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Badge
          badgeContent={notificationCount > 0 ? notificationCount : null}
          color="error"
        >
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      {showNotifications && <NotificationList />}
    </>
  )
}

export default NotificationIcon
