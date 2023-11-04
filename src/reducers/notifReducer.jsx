import { createSlice } from '@reduxjs/toolkit'

const notifReducer = createSlice({
  name: 'notif',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return {...action.payload}
    },
    resetNotification() {
      return null
    }
  }
})

const { setNotification, resetNotification } = notifReducer.actions

export const notify = (message, type, timeout = 4) => {
  return (dispatch) => {
    dispatch(setNotification({message, type}))
    
    setTimeout(() => {
      dispatch(resetNotification())
    }, timeout * 1000)
  }
}


export default notifReducer.reducer