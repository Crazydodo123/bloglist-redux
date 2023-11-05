import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Status = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={() => dispatch(logout())} id='logout-button'>
        logout
      </button>
    </div>
  )
}

export default Status