import Hamburger from "hamburger-react";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../provider/userDatacontext";
import { useContext } from "react";
import { logoutUser } from "../api/methods/auth/users";
import logo from "../assets/flatFinder.png";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setIsOpen(false));

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
    <nav ref={ref} className="md:hidden">
      <Hamburger toggled={isOpen} size={18} toggle={setIsOpen} />
      <div className="absolute flex items-center gap-5 right-6 top-2">
      {loggedUser ? (
          <h2 className="text-xs text-[#F1654D] font-semibold">
            Hello, {userDetails.firstName} {userDetails.lastName}
          </h2>
        ) : (
          <h2></h2>
        )}
        <Link to="/">
          <img
            src={logo}
            className=" top-2 h-[40px]"
            alt="logo"
          />
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed h-full left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-white  border-b border-b-white/20"
          >
            <ul className="grid gap-2">
              {userDetails.role === "admin"
                ? pageName.map((page, index) => (
                    <motion.li
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + index / 10,
                      }}
                      key={index}
                      className="w-full p-[0.08rem] pl-3 rounded-md text-[#F6F7FC] bg-[#F1654D]"
                    >
                      <NavLink
                        onClick={() => setIsOpen((prev) => !prev)}
                        to={page.path}
                      >
                        {page.page}
                      </NavLink>
                    </motion.li>
                  ))
                : pageName.slice(0, 4).map((page, index) => (
                    <motion.li
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + index / 10,
                      }}
                      key={index}
                      className="w-full p-[0.08rem] pl-3 rounded-md text-[#F6F7FC] bg-[#F1654D]"
                    >
                      <NavLink
                        onClick={() => setIsOpen((prev) => !prev)}
                        to={page.path}
                      >
                        {page.page}
                      </NavLink>
                    </motion.li>
                  ))}
            </ul>
            <div>
              {!loggedUser ? (
                <div className="absolute w-full items-center justify-center my-40 mx-44">
                  <Link
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex w-[50%] justify-center text-sm border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]"
                    to={"/Login"}
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex w-full absolute my-40 items-center justify-center left-0 pl-5 gap-48">
                  <button className="text-sm border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]">
                    Delete Account
                  </button>
                  <button
                    className="text-sm border p-1 bg-[#F1654D] border-none rounded-md text-[#F6F7FC]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavMobile;
