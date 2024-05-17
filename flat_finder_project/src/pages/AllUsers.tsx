import { useContext, useEffect, useState } from "react";
import { User} from "../interface";
import { getAllUsers, deleteUser, updateUserRole } from "../api/methods/auth/users";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import SpinnerLoader from "../components/SpinnerLoader";
import { NavLink } from "react-router-dom";
import { FlatContext } from "../provider/flatcontext";
import UserFilter from "../components/UserFilter";

const AllUsers = () => {
  const [users, setUsers] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
 const {flat} =useContext(FlatContext)
 console.log(flat)
  
  const navigate = useNavigate()
  console.log(users); 
  
 

  const getUsers = async () => {
    try{
      setIsLoading(true)
      const data = await getAllUsers();
    console.log("Users", data);
    setUsers(data as unknown as User);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw "An unknown error occurred";
      }
    } finally {
      setIsLoading(false);
    }
  };
  // const normalUser = users.filter((user)=> user.role==="User")
  // console.log(normalUser)

  const handleDeleteUser = async (id:string) => {
  
    console.log(id)
    try{
      await deleteUser(id)
    navigate('/login')
    toast.success("User deleted")
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw "An unknown error occurred";
      }
    }
  }

 
  useEffect(() => {
    getUsers();
  }, []);


  const handleMakeAdmin = async (currentUser: User) => {
      await updateUserRole(currentUser);
      console.log("Role changed");
      getUsers() 
  }

  return (
    <>
    {isLoading && <SpinnerLoader />}
    <h1 className="text-center justify-cente text-[#173466] text-4xl font-bold mt-10">Users accounts</h1>
    <UserFilter users={users} setUsers={setUsers}/>
      <div className=" grid grid-cols-1 md:grid md:grid-cols-2 row-auto w-full place-content-center justify-self-center">
        
        {Array.isArray(users) &&
          users?.map((currentUser: User, index) => (
            <div
              key={index}
              className="flex flex-col mx-auto w-[90%] justify-center items-center mt-28 p-4 gap-10 border-none rounded-lg bg-[#F6F7FC]  shadow-md"
            >
              <div>
                <div className="flex text-3xl font-bold text-[#173466]">
                  <h2>
                    {currentUser.firstName} {currentUser.lastName}{" "}
                  </h2>
                </div>
                <div className="flex flex-col gap-2 text-xl text-[#173466] font-semibold">
                  <p>Email address: {currentUser.email}</p>
                  <p>Birthday: {currentUser.birthday}</p>

                  <p>
                    is Admin: {currentUser.role === "User" ? "No" : "Yes"}
                  </p>
                  <p>Flat posted: {currentUser.userFlatCount}</p>
                </div>
                <div className="flex w-full gap-4 p-4">
                  <NavLink to={`/profile/${currentUser.uid}`}
                    className="text-sm w-24 text-center bg-[#F1654D] p-2 pt-4 rounded-md text-white font-semibold"
                  >
                    View profile
                  </NavLink>
                  {currentUser.role ==="User" ? (<button onClick={()=>handleMakeAdmin(currentUser)}
                  className="text-sm w-24 text-center bg-[#F1654D] p-2 rounded-md text-white font-semibold">Make admin</button>) : (<button onClick={()=>handleMakeAdmin(currentUser)}
                    className="text-sm w-24 text-center bg-[#F1654D] p-2 rounded-md text-white font-semibold">Remove admin</button>)}
                  <button
                    onClick={()=> handleDeleteUser(currentUser.uid as string)}
                    className="text-sm w-24 text-center bg-[#F1654D] p-2 rounded-md text-white font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllUsers;
