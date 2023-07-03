import { useNotificationValue } from "../NotificationContext"
import { useState, useEffect } from "react"

const Notification = () => {
  const [showMessage, setShowMessage] = useState(false)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const currentMessage = useNotificationValue()

  useEffect(() => {
    if (currentMessage !== '') {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }, [currentMessage])

  if (!showMessage) {
    return null
  }

  return (
    <div style={style}>
        {currentMessage}
    </div>
  )
}

export default Notification
