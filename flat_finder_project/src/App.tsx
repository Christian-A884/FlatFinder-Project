import AppRouter from "./router/routes";
import "./App.css";
import { useEffect, useState } from "react";
import { UserDataContext } from "./provider/userDatacontext";
import { fetchUser } from "./api/methods/auth/users";
import { User } from "./interface";

function App() {
  const [userDetails, setUserDetails] = useState({});

  const getUser = async () => {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser") as string
    );

    if (loggedUser.length) {
      const user = await fetchUser(loggedUser)
      setUserDetails(user as User)}
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log (userDetails)

  return (
    <>
      <UserDataContext.Provider value={{ userDetails, setUserDetails }}>
        <AppRouter />
      </UserDataContext.Provider>
    </>
  );
}

export default App;
