import { useState } from 'react'

function useModal (modal) {
  const [ isVisible, setIsVisible ] = useState(false)
  const [selectedUser, setSelectedUser] = useState({});

  function toggleModal (modal) {
    return setIsVisible(!isVisible)
  }

  // any other funtion that needs to be used with any modal can be added here
  function sendData (data) {
    // axios call to update the user info from the modal
  }

  return {isVisible, selectedUser, toggleModal, sendData}
}


export default useModal
