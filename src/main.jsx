import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'


const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notif: notifReducer,
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
