import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notif)

  if (!notification) return null
  return (
    <Alert variant={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification