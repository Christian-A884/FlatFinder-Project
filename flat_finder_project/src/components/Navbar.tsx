import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/flatFinder.png";
import { useContext } from "react";
import { UserDataContext } from "../provider/userDatacontext";
import { logoutUser } from "../api/methods/auth/users";


const Navbar = () => {
  const pageName = [
    { page: "Home", path: "/" },
    { page: "My Profile", path: "/profile" },
    { page: "My Flats", path: "/my-flats" },
    { page: "Favourites", path: "/favourites" },
    { page: "All Users", path: "/allusers" },
  ];
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  const { userDetails } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <nav className= "hidden md:flex justify-between p-4 items-center">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} className="h-[40px]" alt="logo" />
        </Link>
        {loggedUser ? (
          <h2 className="text-xs text-[#F1654D] font-semibold">
            Hello, {userDetails.firstName} {userDetails.lastName}
          </h2>
        ) : (
          <h2></h2>
        )}
      </div>

      <div>
        <ul className="flex gap-4">
         {userDetails.role==='admin' ? pageName.map((page, index) => (
            <li
              key={index}
              className="flex text-[12px] text-[#a2aaad] font-semibold"
            >
              <NavLink to={page.path}>{page.page}</NavLink>
            </li>
          )): pageName.slice(0,4).map((page, index) => (
            <li
              key={index}
              className="flex text-[12px] text-[#a2aaad] font-semibold"
            >
              <NavLink to={page.path}>{page.page}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {!loggedUser ? (
          <Link className="text-[10px] border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]" to={"/Login"}>Login</Link>
        ) : (
          <div className="flex items-center gap-2">
            <button className="text-[8px] border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]">Delete Account</button>
            <button className="text-[8px] border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
