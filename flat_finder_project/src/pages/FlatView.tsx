import { useContext } from "react";
import { FlatContext } from "../provider/flatcontext";
import { useParams } from "react-router";
import { showFlats } from "../api/methods/flats/flats";

const FlatView = () => {
  const { flat } = useContext(FlatContext);

  console.log(flat);
  const id = useParams<{ flatId: string }>();
  console.log(id);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string)
  const currentFlat = flat.filter((flt) => flt.id === id.flatId) || [];
  console.log(currentFlat);
 

  return (
    <>
      <div>
        {currentFlat.length ? (
          <div className="flex flex-col w-[40%] justify-center items-center mt-20 mx-auto p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md">
            <div className="flex text-3xl font-bold text-[#173466]">
              <h2>{`Mr ${currentFlat[0].ownerLastName} flat`}</h2>
            </div>
            <div className="flex flex-col gap-2 text-lg text-[#173466] font-semibold">
              <p>City: {currentFlat[0].city}</p>
              <p>
                Adress: {currentFlat[0].streetName} street, no.{" "}
                {currentFlat[0].streetNumber}{" "}
              </p>
              <p>Has AC:</p>
              <p>Built year: {currentFlat[0].yearBuilt}</p>
              <p>Rent price: {currentFlat[0].rentPrice} $</p>
              <p>Available date: {currentFlat[0].dateAvailable}</p>
              <p></p>
            </div>
            {currentFlat[0].ownerId===loggedUser &&
              <button className="text-[12px] w-20 text-center bg-[#F1654D] p-1 rounded-md text-white font-semibold">Edit Flat</button>
            }
           
          </div>
        ) : (
          ""
        )}
        <div></div>
      </div>
    </>
  );
};

export default FlatView;
