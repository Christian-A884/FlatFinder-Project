import { useContext, useEffect, useState } from "react";
import { showFlats } from "../api/methods/flats/flats";
import { FlatContext } from "../provider/flatcontext";
import { NavLink, useNavigate } from "react-router-dom";

import { FavFlat, Flat } from "../interface";
import {
  addFavouriteFlat,
  removeFavouriteFlat,
} from "../api/methods/flats/flats";
import FlatFilter from "../components/FlatFilter";
import SpinnerLoader from "../components/SpinnerLoader";
import { toast } from "react-toastify";

const Homepage = () => {
  const { flat, setFlat } = useContext(FlatContext);
  const [favFlat, setFavFlat] = useState<FavFlat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(flat);
  console.log(favFlat);

  const navigate = useNavigate();

  // useEffect(() => {
  //   getFlats();
  //   const favFlats = JSON.parse(
  //     (localStorage.getItem("favFlat") as string) || "[]"
  //   );
  //   setFavFlat(favFlats)
  //   // getUsers();
  // }, []);

  const column = [
    { header: "Owner Firstname", value: "ownerFirstName" },
    { header: "Owner Lastname", value: "ownerLastName" },
    { header: "Owner email", value: "ownerEmail" },
    { header: "City", value: "city" },
    { header: "Street", value: "streetName" },
    { header: "Street number", value: "streetNumber" },
    { header: "Area size (sqm)", value: "areaSize" },
    { header: "Has AC", value: "hasAC" },
    { header: "Built Year", value: "yearBuilt" },
    { header: "Rent price (euro)", value: "rentPrice" },
    { header: "Available from", value: "dateAvailable" },
  ];

  const getFlats = async () => {
    try {
      setIsLoading(true);
      const showAllFlats = await showFlats();
      console.log("Flat", showAllFlats);
      setFlat(showAllFlats as Flat[]);
    } catch (error) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw "An unknown error occurred";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (flatId: string) => {
    await addFavouriteFlat(favFlat, { flatId: flatId as string });
    const updatedFlat = flat.map((flt: Flat) =>
      flt.id === flatId ? { ...flt, isFavourite: !flt.isFavourite } : flt
    );
    setFlat(updatedFlat);
  };

  const favFlats = JSON.parse(
    (localStorage.getItem("favFlat") as string) || "[]"
  );
  const handleRemoveFavFlat = async (flatId: string) => {
    try {
      await removeFavouriteFlat(flatId, favFlats);
      const updatedFavFlat = favFlat.filter((item) => item.flatId !== flatId);
      setFavFlat(updatedFavFlat);
      toast.success("Flat has been removed from favourites");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  // const getUsers = async () => {
  //   const users = await getAllUsers();
  //   console.log(users);
  // };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
      navigate("/login");
    }
    getFlats();
    const favFlats = JSON.parse(
      (localStorage.getItem("favFlat") as string) || "[]"
    );
    setFavFlat(favFlats);
    // getUsers();
  }, []);

  return (
    <>
      {isLoading && <SpinnerLoader />}
      <div className="overflow-x-scroll mt-16">
        <FlatFilter />
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
            {Array.isArray(flat) &&
              flat?.map((obj, index) => (
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
                    <div className="flex gap-3 items-center justify-center p-2 ">
                      <NavLink
                        to={`/flat-view/${obj.id}`}
                        className="text-[8px] w-16 text-center bg-[#F1654D] p-1 rounded-md text-xs text-white font-semibold"
                      >
                        View flat
                      </NavLink>

                      <button
                        onClick={() => {
                          if (favFlat.some((item) => item.flatId === obj.id)) {
                            handleRemoveFavFlat(obj.id);
                          } else {
                            handleClick(obj.id);
                          }
                        }}
                        className={`text-xs  ${
                          favFlat.some((item) => item.flatId === obj.id)
                            ? "bg-blue-600"
                            : "bg-[#F1654D]"
                        }  p-1 rounded-md text-white font-semibold`}
                      >
                        Favorite
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Homepage;
