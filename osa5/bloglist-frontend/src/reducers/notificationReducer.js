import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return ""
    },
  },
})
export const { displayNotification, hideNotification } =
  notificationSlice.actions

export const setNotification = (text) => {
  return (dispatch) => {
    dispatch(displayNotification(text))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
