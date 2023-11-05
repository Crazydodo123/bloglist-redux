import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notif: notifReducer,
  }
})

export default store