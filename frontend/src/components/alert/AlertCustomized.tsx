import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import { IoClose } from "react-icons/io5";

export const AlertCustomized = ({
  typeResponse,
  error,
  setAlert,
 } : {
  typeResponse: any
  error: string
  setAlert: any
}) => {
  const colorTypeResponse = () => {
    if (typeResponse === 'success') {
      return 'green'
    } else if (typeResponse === 'error') {
      return 'red'
    } else if (typeResponse === 'alert') { 
      return 'yellow'
    }
  }

  console.log(colorTypeResponse())
  const [parent] = useAutoAnimate()

  const [showAlert, setShowAlert] = useState(true)

  const handleCloseAlert = () => {
    setShowAlert(false);
    location.reload()
  }
  return (
    <div className={`relative text-sm w-full rounded-lg ${typeResponse==='error' ? 'bg-red-300' : 'bg-green-300'} p-2`} ref={parent}>
      {showAlert && typeResponse && (
        <div className='inline-flex p-1'>
          <div className={`alert alert-${typeResponse} flex items-center justify-center`}>
            <div>{error}</div> 
            <button className="close px-2 items-center justify-center hover " onClick={handleCloseAlert}>
              {typeResponse === 'error' ? <IoClose />: <p className='bg-green-500 rounded-lg p-1 justify-center items-center hover hover:bg-green-600'>OK</p>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}