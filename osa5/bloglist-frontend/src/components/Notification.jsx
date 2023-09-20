export const Notification = ({ message, isError }) => {
  if (message.length < 1) {
    return <div></div>
  }

  if (isError) {
    return <div className="error">{message}</div>
  }

  return <div className="notification">{message}</div>
}
