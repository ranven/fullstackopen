import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector((state) => state.notification)
  if (message.length < 1) {
    return <div></div>
  }

  /*   if (isError) {
    return <div id="error">{message}</div>
  } */

  return <div id="notification">{message}</div>
}

export default Notification
