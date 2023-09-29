import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.length > 1 ? "block" : "none",
  }
  return <div style={style}>{notification}</div>
}

export default Notification
