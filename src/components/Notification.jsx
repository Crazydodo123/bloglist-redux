import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)

  const defaultStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const pickStyle = (style) => {
    if (style === 'error') {
      return errorStyle
    } else {
      return defaultStyle
    }
  }

  console.log(notification)

  if (!notification) return null
  return (
    <div style={pickStyle(notification.type)} className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification