import { useContext, useState } from "react" 
import { addFavouriteFlat } from "../api/methods/flats/flats"
import { UserDataContext } from "../provider/userDatacontext"
import { FlatContext } from "../provider/flatcontext"
import { FavFlat } from "../interface"



const Checkbox = ({flatId}) => {
  const [isChecked, setIsChecked] = useState(false)
  const {userDetails} = useContext(UserDataContext)
  const {flat} = useContext(FlatContext)
  const favFlat = JSON.parse((localStorage.getItem("favFlat") as string) || "[]")


console.log({isChecked})
console.log(userDetails.favourite)
  const checkHandler = async (flatId:string)=> {
    setIsChecked(!isChecked)
    const ap = await addFavouriteFlat(favFlat, {flatId: flatId as string})
    console.log(ap)
   
  }
  const flatIndex = favFlat.map(favFlt => flat.findIndex(flt => flt.id === favFlt.flatId))

  if(flatIndex === -1) {
    setIsChecked(!isChecked)
  }
  console.log(flatId)
  return (
    <div>
      <input type="checkbox" id='checkbox' checked={isChecked}
      onChange={()=>checkHandler(flatId)} />
    </div>
  )
}

export default Checkbox
 