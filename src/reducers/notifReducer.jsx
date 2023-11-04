const notifReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return { ...action.payload }
    case 'RESET':
      return null
    default:
      return state
  }
}

export const notify = (message, type) => {
  return {
    type: 'SET_NOTIF',
    payload: {
      message,
      type,
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notifReducer