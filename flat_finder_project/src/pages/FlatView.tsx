import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FlatModal from "../components/FlatModal";
import { Flat, Message } from "../interface";
import MessageBox from "../components/MessageBox";
import { getFlatbyId, getMessagesbyFlatId } from "../api/methods/flats/flats";
import SpinnerLoader from "../components/SpinnerLoader";
import { toast } from "react-toastify";

const FlatView = () => {
  const [flatModal, setFlatModal] = useState(false);
  const [currentFlat, setCurrentFlat] = useState<Flat | null>(null);

  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false)
console.log(allMessages)
  

  const toggleFlatModal = () => {
    setFlatModal(!flatModal);
  };

  const id = useParams<{ flatId: string }>();
  console.log(id)

  useEffect(() => {
    
    async function getData() {
      
      if(id.flatId) {
      try {
        setIsLoading(true)
        
        const data = (await getFlatbyId(id.flatId)) as Flat;
        setCurrentFlat(data);

        const messages = await getMessagesbyFlatId(id.flatId);
        console.log(messages)
        setAllMessages(messages);
        
        
      } catch(error) {
        toast.error(error.message);
      }
      finally{
        setIsLoading(false)
      }}
      
    }
    getData();
    
  }, []);

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);

  return (
    <>
    {isLoading && <SpinnerLoader/>}
      <div className=" flex flex-col w-full ">
        <div className="flex justify-items-center justify-self-center">
          {currentFlat ? (
            <div className="flex flex-col w-[50%] justify-center items-center mt-28 mx-auto p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md">
              <div className="flex text-3xl font-bold text-[#173466]">
                <h2>{`Mr ${currentFlat.ownerLastName} flat`}</h2>
              </div>
              <div className="flex flex-col gap-2 text-xl text-[#173466] font-semibold">
                <p>City: {currentFlat.city}</p>
                <p>
                  Adress: {currentFlat.streetName} street, no.{" "}
                  {currentFlat.streetNumber}{" "}
                </p>
                <p>Has AC:</p>
                <p>Built year: {currentFlat.yearBuilt}</p>
                <p>Rent price: {currentFlat.rentPrice} $</p>
                <p>Available date: {currentFlat.dateAvailable}</p>
                <p></p>
              </div>
              {currentFlat.ownerId === loggedUser && (
                <button
                  onClick={toggleFlatModal}
                  className="text-sm w-20 text-center bg-[#F1654D] p-2 rounded-md text-white font-semibold"
                >
                  Edit Flat
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col w-full justify-center items-center mt-28 mx-auto p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md"></div>
          )}
          <div>
            {currentFlat && currentFlat.ownerId !== loggedUser ? (
              <MessageBox />
            ) : (
              allMessages.map((message, index) => (
                <div
                  key={index}
                  className="flex flex-col h-[30%] w-[70%] justify-center items-start mt-10 mx-auto gap-2 border-none rounded-lg bg-[#F6F7FC]  shadow-md"
                >
                  <p className="text-sm text-[#173466] font-semibold pl-3">
                    Message date: {message.date.toDate().toString()}
                  </p>
                  <p className="text-sm text-[#173466] font-semibold pl-3">
                    Sender name: {message.senderFirstname}{" "}
                    {message.senderLastname}
                  </p>
                  <p className="text-sm text-[#173466] font-semibold pl-3">
                    Sender email: {message.senderEmail}
                  </p>
                  <p className="text-sm text-[#173466] font-semibold pl-3">
                    Message: "{message.messageContent}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {flatModal && (
          <FlatModal currentFlat={currentFlat} setCurrentFlat={setCurrentFlat} closeModal={toggleFlatModal} />
        )}
      </div>
    </>
  );
};

export default FlatView;
