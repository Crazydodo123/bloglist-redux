import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

const Status = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.name} logged in
      <button
        style={{ marginBottom: 20 }}
        onClick={() => dispatch(logout())}
        id="logout-button"
      >
        logout
      </button>
    </>
  );
};

export default Status;
