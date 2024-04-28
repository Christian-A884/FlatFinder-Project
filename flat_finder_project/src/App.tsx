import AppRouter from "./router/routes";
import "./App.css";
import { useEffect, useState } from "react";
import { UserDataContext } from "./provider/userDatacontext";
import { fetchUser } from "./api/methods/auth/users";
import { FlatContext } from "./provider/flatcontext";
import {User} from './interface'


function App() {
  const [userDetails, setUserDetails] = useState({});
  const [allUsers,setAllUsers] = useState([])
  const [flat, setFlat] = useState([]);

  

  const getUser = async () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);

  
      const user = await fetchUser(loggedUser);
      setUserDetails(user as User);
    
  };

  useEffect(() => {
    getUser();
  }, []);

  

  return (
    <>
      <FlatContext.Provider value={{ flat, setFlat }}>
        <UserDataContext.Provider value={{ userDetails, setUserDetails, allUsers, setAllUsers }}>
          <AppRouter />
        </UserDataContext.Provider>
      </FlatContext.Provider>
    </>
  );
}

export default App;
