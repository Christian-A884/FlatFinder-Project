import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/flatFinder.png";
import { useContext, useState } from "react";
import { UserDataContext } from "../provider/userDatacontext";
import { logoutUser } from "../api/methods/auth/users";
import { useEffect } from "react";

const Navbar = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") as string);
  const pageName = [
    { page: "Home", path: "/" },
    { page: "My Profile", path: `/profile/${loggedUser}` },
    { page: "My Flats", path: "/my-flats" },
    { page: "Favorites", path: "/favourites" },
    { page: "All Users", path: "/allusers" },
  ];

  const { userDetails} = useContext(UserDataContext);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMyFlatsPage = location.pathname === "/my-flats";

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("favFlat");
    setRender(false);
    navigate("/login");
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("loggedUser") as string)) {
      setRender(false);
    } else {
      setRender(true);
    }
  }, [render, userDetails]);

  if (!render) {
    return null;
  }

  return (
    <nav className="hidden mdl:flex justify-between p-4 items-center">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src={logo} className="h-[60px]" alt="logo" />
        </Link>
        {loggedUser && userDetails ? (
          
          <h2 className="text-lg text-[#F1654D] font-semibold">
            Hello, {userDetails.firstName} {userDetails.lastName}
          </h2>
        ) : (
          <h2></h2>
        )}
      </div>

      <div>
        <ul className="flex gap-4">
          {userDetails.role === "Admin"
            ? pageName.map((page, index) => (
                <li
                  key={index}
                  className="flex text-lg text-[#a2aaad] font-semibold"
                >
                  <NavLink to={page.path}>{page.page}</NavLink>
                </li>
              ))
            : pageName.slice(0, 4).map((page, index) => (
                <li
                  key={index}
                  className="flex text-lg text-[#a2aaad] font-semibold"
                >
                  <NavLink to={page.path}>{page.page}</NavLink>
                </li>
              ))}
        </ul>
      </div>
      <div>
        {!loggedUser ? (
          <Link
            className="text-[10px] border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]"
            to={"/Login"}
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            {isMyFlatsPage && (
              <Link
                to={"/new-flat"}
                className="text-xs border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC] font-semibold"
              >
                + New Flat
              </Link>
            )}
            <button className="text-xs border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC] font-semibold">
              Delete Account
            </button>
            <button
              className="text-xs border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC] font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
