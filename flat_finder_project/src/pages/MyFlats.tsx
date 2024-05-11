import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FlatContext } from "../provider/flatcontext";

const MyFlats = () => {
  const { flat } = useContext(FlatContext);
  console.log(flat)
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  const userFlats = flat.filter((flt) => flt.ownerId === loggedUser)
  console.log(userFlats)

  const column = [
    
    { header: "City", value: "city" },
    { header: "Street", value: "streetName" },
    { header: "Street number", value: "streetNumber" },
    { header: "Area size", value: "areaSize" },
    { header: "Has AC", value: "hasAC" },
    { header: "Built Year", value: "yearBuilt" },
    { header: "Rent price", value: "rentPrice" },
    { header: "Date available", value: "dateAvailable" },
  ];

  // const userFlats = flat.filter((flt) => flt.)

  return (
    <div className="overflow-x-scroll">
  
    <table className="mx-auto my-7 w-[95%] h-auto border-spacing-4 table-auto shadow-lg ">
      <thead>
        <tr>
          {column.map((item, index) => (
            <th
              className="border border-solid border-l-0 border-r-0 text-[#F1654D] text-sm items-center justify-center p-1"
              key={index}
            >
              {item.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {userFlats.map((obj, index, btnIndex) => (
          <tr key={index}>
            {column.map((columnItem, colIndex) => (
              <td
                key={colIndex}
                className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1"
              >
                {obj[`${columnItem.value}`]}
              </td>
            ))}
            <td key={btnIndex}>
              <div className="flex gap-2 items-center justify-center p-2 ">
                <NavLink
                    to={`/flat-view/${obj.id}`} className="text-[8px] w-12 text-center bg-[#F1654D] p-1 rounded-md text-white font-semibold">
                  View flat
                </NavLink>

                {/* <button onClick={()=> handleClick(obj.id)} className={`text-[8px]  ${ favFlat.some(item => item.flatId === obj.id) ? "bg-blue-600" : "bg-[#F1654D]"}  p-1 rounded-md text-white font-semibold`}>
                  Favourite
                 </button> */}
                
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  
);
};
  

export default MyFlats