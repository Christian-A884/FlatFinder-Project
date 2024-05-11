import { useContext, useState, useEffect } from "react";
import { FlatContext } from "../provider/flatcontext";
import { useParams } from "react-router";

import FlatModal from "../components/FlatModal";
import { Flat, Message } from "../interface";
import { UserDataContext } from "../provider/userDatacontext";

import MessageBox from "../components/MessageBox";
import { showMessages } from "../api/methods/messages/message";

const FlatView = () => {
  const { flat } = useContext(FlatContext);
  const { userDetails } = useContext(UserDataContext);
  const [flatModal, setFlatModal] = useState(false);
  const [currentFlat, setCurrentFlat] = useState<Flat[]>([]);
  const [message, setMessage] = useState({});
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const getMessage = async () => {
    const showAllMessages = await showMessages();
    console.log(showAllMessages);
    setAllMessages(showAllMessages as Message[]);
  };

  const toggleFlatModal = () => {
    setFlatModal(!flatModal);
  };

  console.log(flat);
  const id = useParams<{ flatId: string }>();
  console.log(id);
  useEffect(() => {
    const selectedFlat = flat.filter((flt) => flt.id === id.flatId);
    setCurrentFlat(selectedFlat || null);
    setMessage({
      ...id,
      senderEmail: userDetails.email,
      senderLastname: userDetails.lastName,
      senderFirstname: userDetails.firstName,
    });
    getMessage();
  }, [flat, id.flatId]);

  console.log(message);

  // const specificMessage = message.filter((msg) => msg.flatId === id.flatId)
  // console.log(specificMessage)

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  console.log(currentFlat);
  const currentMessage = allMessages.filter((msg) => msg.flatId === id.flatId);
  console.log(currentMessage);

  return (
    <>
      <div className=" flex flex-col w-full ">
        <div className="flex justify-items-center justify-self-center">
          {currentFlat.length ? (
            <div className="flex flex-col w-[50%] justify-center items-center mt-28 mx-auto p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md">
              <div className="flex text-3xl font-bold text-[#173466]">
                <h2>{`Mr ${currentFlat[0].ownerLastName} flat`}</h2>
              </div>
              <div className="flex flex-col gap-2 text-xl text-[#173466] font-semibold">
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
              {currentFlat[0].ownerId === loggedUser && (
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
            {currentFlat.length && currentFlat[0].ownerId !== loggedUser ? (
              <MessageBox message={message} />
            ) : (
              currentMessage.map((message, index) => (
                <div key={index} className="flex flex-col h-[30%] w-[70%] justify-center items-start mt-10 mx-auto gap-2 border-none rounded-lg bg-[#F6F7FC]  shadow-md">
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
          <FlatModal currentFlat={currentFlat} closeModal={toggleFlatModal} />
        )}
      </div>
    </>
  );
};

export default FlatView;
