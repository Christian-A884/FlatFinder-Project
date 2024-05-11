import AppRouter from "./router/routes";
import "./App.css";
import { useEffect, useState } from "react";
import { UserDataContext } from "./provider/userDatacontext";
import { fetchUser } from "./api/methods/auth/users";
import { FlatContext } from "./provider/flatcontext";
import { User, Flat } from "./interface";
import { ToastContainer } from "react-toastify";


function App() {
  const [userDetails, setUserDetails] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [flat, setFlat] = useState([] as Flat[]);
  console.log(flat);

  const getUser = async () => {
    const loggedUser =
      JSON.parse(localStorage.getItem("loggedUser") as string) || "";

    if (loggedUser.length)
      setUserDetails((await fetchUser(loggedUser)) as User);
  };

  //  const getFlats = async () => {
  //   const showAllFlats = await showFlats();
  //   console.log("Flat", showAllFlats);
  //   setFlat(showAllFlats as Flat[]);
  // };

  useEffect(() => {
    getUser();
    // getFlats();
  }, []);

  return (
    <>
      
        <FlatContext.Provider value={{ flat, setFlat }}>
          <UserDataContext.Provider
            value={{ userDetails, setUserDetails, allUsers, setAllUsers }}
          >
            <ToastContainer/>
            <AppRouter />
          </UserDataContext.Provider>
        </FlatContext.Provider>
     
    </>
  );
}

export default App;
