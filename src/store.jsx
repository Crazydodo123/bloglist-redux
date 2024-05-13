import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notifReducer from "./reducers/notifReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    notif: notifReducer,
  },
});

export default store;
