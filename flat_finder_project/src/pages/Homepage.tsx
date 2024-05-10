import { useContext, useEffect, useState } from "react";
import { showFlats } from "../api/methods/flats/flats";
import { FlatContext } from "../provider/flatcontext";
import { NavLink } from "react-router-dom";

import { Flat } from "../interface";
import { addFavouriteFlat } from "../api/methods/flats/flats";
import FlatFilter from "../components/FlatFilter";


const Homepage = () => {
 
  const { flat, setFlat } = useContext(FlatContext);
  const [favFlat, setFavFlat] = useState([])
  console.log(flat)
  console.log(favFlat)

  useEffect(() => {
    getFlats();
    const favFlats = JSON.parse(
      (localStorage.getItem("favFlat") as string) || "[]"
    );
    setFavFlat(favFlats)
    // getUsers();
  }, []);

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

  
  const getFlats = async () => {
    const showAllFlats = await showFlats();
    console.log("Flat", showAllFlats);
    setFlat(showAllFlats as Flat[]);
  };

  const handleClick = async (flatId: string) => {
    
  await addFavouriteFlat(favFlat, { flatId: flatId as string });
   

   const updatedFlat = await flat.map((flt)=> flt.id === flatId ? { ...flt, isFavourite: !flt.isFavourite} : flt)
   setFlat(updatedFlat)
   
  };


  // const getUsers = async () => {
  //   const users = await getAllUsers();
  //   console.log(users);
  // };

  useEffect(() => {
    getFlats();
    const favFlats = JSON.parse(
      (localStorage.getItem("favFlat") as string) || "[]"
    );
    setFavFlat(favFlats)
    // getUsers();
  }, []);

  return (
    
    <div className="overflow-x-scroll">
      <FlatFilter/>
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
          {flat.map((obj, index, btnIndex) => (
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

                  <button onClick={()=> handleClick(obj.id)} className={`text-[8px]  ${ favFlat.some(item => item.flatId === obj.id) ? "bg-blue-600" : "bg-[#F1654D]"}  p-1 rounded-md text-white font-semibold`}>
                    Favourite
                   </button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
};

export default Homepage;
