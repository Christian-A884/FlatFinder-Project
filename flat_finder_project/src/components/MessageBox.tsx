import { useContext, useRef } from "react";
import { addNewMessage } from "../api/methods/messages/message";
import { UserDataContext } from "../provider/userDatacontext";
import { useParams } from "react-router";

const MessageBox = () => {
  const {userDetails}= useContext(UserDataContext)
  const messageContent = useRef("")
  const id = useParams<{ flatId: string }>()
  const sendMessage = async () => {
    await addNewMessage({
      senderFirstname: userDetails.firstName,
      senderLastname: userDetails.lastName,
      senderEmail:userDetails.email,
      flatId: id.flatId,
      messageContent: messageContent.current.value as string,
      date: new Date(),
    });
  };


  return (
    <div className="flex flex-col h-[50%] w-[90%] justify-center items-center mt-36 mr-40 gap-6 border-none rounded-lg bg-[#F6F7FC]  shadow-md">
      <div className="flex flex-col gap-5 w-full h-[50%] items-center text-[#173466] font-semibold">
        <label className="text-lg" htmlFor="message">You can leave a message here:</label>
        <textarea
          ref={messageContent}
          id="message"
          cols={40}
          rows={4}
          className="text-xs "
        ></textarea>
      </div>
      <button
        onClick={sendMessage}
        type="button"
        className="text-sm w-20 text-center bg-[#F1654D] p-1 rounded-md text-white font-semibold"
      >
        Send
      </button>
    </div>
  );
};

export default MessageBox;
