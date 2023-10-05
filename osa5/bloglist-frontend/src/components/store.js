import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../reducers/notificationReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

store.subscribe(() => {})

export default store
