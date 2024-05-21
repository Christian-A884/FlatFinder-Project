import { createContext } from "react";
import {User} from "../interface"



interface UserDataContextProps {
  userDetails: User
  setUserDetails: React.Dispatch<React.SetStateAction<User>>;
}

export const UserDataContext = createContext<UserDataContextProps>({
  userDetails:{} as User,
  setUserDetails: () => {},
});