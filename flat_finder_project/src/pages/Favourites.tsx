import { useEffect, useState } from "react";
import { getFlatsbyFlatId, removeFavouriteFlat } from "../api/methods/flats/flats";
import { Flat } from "../interface";
import SpinnerLoader from "../components/SpinnerLoader";
import { toast } from "react-toastify";


const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [userFavFlats, setUserFavFlats] = useState<Flat[]>([])
  const column = [
    { header: "Owner Firstname", value: "ownerFirstName" },
    { header: "Owner Lastname", value: "ownerLastName" },
    { header: "Owner email", value: "ownerEmail" },
    { header: "City", value: "city" },
    { header: "Street", value: "streetName" },
    { header: "Street number", value: "streetNumber" },
    { header: "Area size", value: "areaSize" },
    { header: "Has AC", value: "hasAC" },
    { header: "Built Year", value: "yearBuilt" },
    { header: "Rent price", value: "rentPrice" },
    { header: "Date available", value: "dateAvailable" },
  ];

  const favFlats = JSON.parse(localStorage.getItem("favFlat")as string)
  const getUserFavouriteFlats = async() => {
    try {
      setIsLoading(true);
      const data = (await getFlatsbyFlatId(favFlats)) as Flat[];
      setUserFavFlats(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw "An unknown error occurred";
      }
    } finally {
      setIsLoading(false);
    }}

    useEffect(()=>{
      getUserFavouriteFlats()
    },[])

    console.log(userFavFlats)

    const handleRemoveFavFlat=async(flatId:string) => {
      try {
        setIsLoading(true)
        const newFavFlat = await removeFavouriteFlat(flatId, favFlats)
        setUserFavFlats(newFavFlat as Flat[])
        toast.success("Favourite flats updated")
      } catch(error){
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false)
      }
     
    }

  return (
    <>
    {isLoading && <SpinnerLoader />}
     <div className="overflow-x-scroll mt-16">
      
       <table className="mx-auto my-7 w-full h-auto border-spacing-4 table-auto shadow-lg ">
         <thead>
           <tr>
             {column.map((item, index) => (
               <th
                 className="border border-solid border-l-0 border-r-0 text-[#F1654D] text-lg items-center justify-center p-1"
                 key={index}
               >
                 {item.header}
               </th>
             ))}
             <th className="border border-solid border-l-0 border-r-0 text-[#F1654D] text-lg items-center justify-center p-1">
               Action buttons
             </th>
           </tr>
         </thead>
         <tbody>
           {Array.isArray(userFavFlats) && userFavFlats?.map((obj, index) => (
             <tr key={index}>
               {column.map((columnItem, colIndex) => (
                 <td
                   key={colIndex}
                   className="text-base font-semibold text-[#173466] text-center justify-center px-2 py-1"
                 >
                   {obj[`${columnItem.value}`] as React.ReactNode}
                 </td>
               ))}
               <td key={obj.id}>
                 <button onClick={()=>{handleRemoveFavFlat(obj.id)}} className="text-[8px] w-16 text-center bg-[#F1654D] p-1 rounded-md text-xs text-white font-semibold">Remove</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </>
  )
}

export default Favourites