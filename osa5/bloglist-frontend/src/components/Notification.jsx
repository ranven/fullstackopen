export const Notification = ({ message, isError }) => {
  if (message.length < 1) {
    return <div></div>
  }

  if (isError) {
    return <div id="error">{message}</div>
  }

  return <div id="notification">{message}</div>
}
