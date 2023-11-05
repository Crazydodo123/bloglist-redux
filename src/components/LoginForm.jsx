import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notifReducer'
import { login } from '../reducers/userReducer'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(login(username, password))
      setUsername('')
      setPassword('')

    } catch ({ response }) {
      console.log(response.data)
      setPassword('')
      dispatch(notify('wrong username or password', 'error'))
    }

  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>username </label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor='password'>password </label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm