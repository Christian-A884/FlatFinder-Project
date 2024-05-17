import { useEffect, useState } from "react";
import SpinnerLoader from "../components/SpinnerLoader";
import { useParams } from "react-router";
import { getUserbyId } from "../api/methods/auth/users";
import { User } from "../interface";
import EditProfileModal from "../components/EditProfileModal";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState(false);

  console.log(currentUser);

  const id = useParams<{ uid: string }>();
  console.log(id);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);

  const toggleEditUserProfileModal = () => {
    setEditUser(!editUser);
  };

  useEffect(() => {
    async function getData() {
      if (id.uid) {
        const fetchedData = await getUserbyId(id.uid);
        setCurrentUser(fetchedData);
      }
    }
    getData();
  }, []);
  return (
    <>
      {isLoading && <SpinnerLoader />}
      <div className=" flex flex-col w-full ">
        <div className="flex justify-items-center justify-self-center">
          {currentUser ? (
            <div className="flex flex-col w-[50%] justify-center items-center mt-28 mx-auto p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md">
              <div className="flex text-3xl font-bold text-[#173466]">
                <h2>
                  {currentUser.firstName} {currentUser.lastName}{" "}
                </h2>
              </div>
              <div className="flex flex-col gap-2 text-xl text-[#173466] font-semibold">
                <p>Email address: {currentUser.email}</p>
                <p>Birthday: {currentUser.birthday}</p>

                <p>is Admin: {currentUser.role === "regular" ? "No" : "Yes"}</p>
              </div>
              {currentUser.uid === loggedUser && (
                <button
                  onClick={toggleEditUserProfileModal}
                  className="text-sm w-24 text-center bg-[#F1654D] p-2 rounded-md text-white font-semibold"
                >
                  Edit profile
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col w-full justify-center items-center mt-28 mx-auto p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md"></div>
          )}
        </div>
        {editUser && (
          <EditProfileModal closeModal={toggleEditUserProfileModal} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        )}
      </div>
    </>
  );
};

export default Profile;
