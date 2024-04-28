import { useContext, useEffect } from "react";
import { showFlats } from "../api/methods/flats/flats";
import { getAllUsers } from "../api/methods/auth/users";
import { FlatContext } from "../provider/flatcontext";
import { Flat } from "../interface";
import { Link } from "react-router-dom";
import Checkbox from "../components/Checkbox";

const Homepage = () => {
  const { flat, setFlat } = useContext(FlatContext);
  console.log(flat)
  const getFlats = async () => {
    const showAllFlats = await showFlats();
    console.log("Flat", showAllFlats);
    setFlat(showAllFlats);
  };

  const getUsers = async () => {
    const users = await getAllUsers();
    console.log(users);
  };

  useEffect(() => {
    getFlats();
    getUsers();
  }, []);

  return (
    <>
      <div className="relative w-[95%] flex flex-col shadow-lg mb-6 mt-4 mx-auto">
        <div className="">
          <table className="w-full">
            <thead>
              <tr className="border border-solid border-l-0 border-r-0 text-[#F1654D]">
                <th className="text-sm items-center justify-center p-1">
                  Owner Firstname
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Owner Lastname
                </th>
                <th className="text-sm items-center justify-center px-3 py-1">
                  Email
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  City
                </th>
                <th className="text-sm items-center justify-center px-4 py-1">
                  Street
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Street number
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Area sqm
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Has AC
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Built year
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Rent price
                </th>
                <th className="text-sm items-center justify-center px-2 py-1">
                  Date available
                </th>
              </tr>
            </thead>
            <tbody>
              {flat.map((item) => (
                <tr key={item.id}>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.userFirstName}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.userLastName}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.userEmail}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.city}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.streetName}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.streetNumber}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.areaSize}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.hasAC}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.yearBuilt}
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.rentPrice}$
                  </td>
                  <td className="text-xs font-semibold text-[#173466] text-center justify-center px-2 py-1">
                    {item.dateAvailable}
                  </td>
                  <td className="w-auto h-auto px-2 py-1 items-center justify-center">
                  <Link to="/flat-view" className="text-[8px] w-full bg-[#F1654D] p-1 rounded-md text-white font-semibold"> View flat</Link>
                  </td>
                  
                  <td className="flex text-center justify-center px-2 py-1 mr-2">
                  <Checkbox/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Homepage;
