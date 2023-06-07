const Notification = (notificationObj) => {
  if (Object.keys(notificationObj).length === 0) {
    return null
  }

  const {type, message} = notificationObj
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification