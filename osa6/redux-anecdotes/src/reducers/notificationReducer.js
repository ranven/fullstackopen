import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const addNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(setNotification(""))
    }, 1000 * timeout)
  }
}
