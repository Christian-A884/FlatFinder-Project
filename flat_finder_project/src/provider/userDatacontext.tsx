import { createContext } from "react";
import {User} from "../interface"



interface UserDataContextProps {
  userDetails: User | null;
  setUserDetails: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserDataContext = createContext<UserDataContextProps>({
  userDetails:null,
  setUserDetails: () => {},
});