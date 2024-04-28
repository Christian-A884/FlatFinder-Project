import { useState } from "react"


const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false)
console.log({isChecked})
  const checkHandler = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div>
      <input type="checkbox" id='checkbox' checked={isChecked}
      onChange={checkHandler} />
    </div>
  )
}

export default Checkbox
