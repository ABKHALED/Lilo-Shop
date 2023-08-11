import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaShoppingBag,
  FaUserAlt,
  FaPlus,
  FaAngleDoubleUp,
  FaAngleDoubleDown,
} from "react-icons/fa";
import { MdLogin, MdLogout, MdManageHistory } from "react-icons/md";
import { toast } from "react-toastify";
///////
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firestoreconfig";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/userSlice";
import { setCart } from "../redux/CartSlice";
import { usersIds } from "../utils/firebaseFunctions";

function NavBar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const cart = useSelector((state) => state.cart.cartShow);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const info = useSelector((state) => state.user.value);
  const getUser = async () => {
    if (!info) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch(login(providerData[0]));
      usersIds({ id: providerData[0].uid });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      toast.success(`Welcome ${providerData[0].displayName}`, {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  const outUser = () => {
    localStorage.removeItem("user");
    dispatch(logout(null));
    toast.warning(`See you next time ${info.displayName}`, {
      position: "top-center",
      theme: "dark",
      autoClose: 2000,
    });
  };

  return (
    <div className="h-20 w-full fixed top-0 right-0 drop-shadow-xl bg-white z-40">
      <div className="w-full px-3 md:px-9  h-full bg-white">
        {/* descktop */}
        <div className="items-center justify-between h-full hidden md:flex">
          <ul className="flex gap-6 text-textColor h-full items-center">
            <li className='h-full flex items-center  justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="shop/rings"
              >
                RINGS
              </NavLink>
            </li>
            <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="shop/bracelets"
              >
                BRACELETS
              </NavLink>
            </li>
            <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="shop/earrings"
              >
                EARRINGS
              </NavLink>
            </li>
            <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="shop/neklaces"
              >
                NEKLACES
              </NavLink>
            </li>
          </ul>

          <Link
            to="/"
            className="flex flex-col items-center justify-center w-[130px] "
          >
            <h1 className=" text-primary text-[35px] m-0 font-bold">LILO</h1>
            <p className=" text-textColor text-[17px]">Jewelry Store</p>
          </Link>
          <div className="h-full flex items-center gap-5">
            <ul className="flex flex-1 gap-6 text-textColor h-full items-center">
              <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-black"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-black"
                  }
                  to="about"
                >
                  About
                </NavLink>
              </li>
              <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] before:top-0 before:left-0 before:hover:w-full before:transition-all before:duration-150 before:ease-in-out cursor-pointer '>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary" : "text-black"
                  }
                  to="contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <div
                onClick={() => dispatch(setCart(!cart))}
                className="relative group cursor-pointer py-[13px] px-[14px]"
              >
                <FaShoppingBag
                  size={20}
                  className="group-hover:text-primary transition-all duration-150 ease-in-out"
                />
                <span className="w-5 h-5 text-[11px] rounded-full flex items-center justify-center bg-black text-white absolute top-0 right-0 group-hover:bg-primary transition-all duration-150 ease-in-out">
                  {cartItems.length}
                </span>
              </div>
              <div className=" cursor-pointer relative ">
                <div
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                  className="w-[40px] h-[40px] bg-slate-200 flex items-center justify-center rounded-full shadow-lg"
                >
                  {!info ? (
                    <FaUserAlt
                      size={20}
                      className=" hover:text-primary transition-all duration-150 ease-in-out"
                    />
                  ) : (
                    <img
                      src={info.photoURL}
                      alt="user"
                      className=" w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                {showMenu && (
                  <motion.div
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex flex-col  w-[150px] absolute right-4 top-12 drop-shadow-xl bg-slate-100 rounded-md overflow-hidden"
                  >
                    {!info && (
                      <p
                        onClick={() => {
                          getUser();
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                      >
                        LogIn
                        <MdLogin />
                      </p>
                    )}
                    {(info && info.email === "khaledarib995@gmail.com") ||
                    (info && info.email === "khaledlakamora1995@gmail.com") ? (
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center gap-5 text-primary text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                            : "flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                        }
                        onClick={() => setShowMenu(false)}
                        to="dashBored/addItem"
                      >
                        Add item
                        <FaPlus />
                      </NavLink>
                    ) : (
                      ""
                    )}
                    {info && (
                      <>
                        <Link
                          className="flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                          to="ordersHistory"
                          onClick={() => {
                            setShowMenu(false);
                          }}
                        >
                          Orders
                          <MdManageHistory />
                        </Link>
                        <p
                          onClick={() => {
                            outUser();
                            setShowMenu(false);
                            navigate("/");
                          }}
                          className="flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                        >
                          LogOut
                          <MdLogout />
                        </p>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="h-full flex md:hidden items-center justify-between">
          <div
            onClick={() => dispatch(setCart(!cart))}
            className="relative group cursor-pointer py-[13px] px-[14px]"
          >
            <FaShoppingBag
              size={20}
              className="group-hover:text-primary transition-all duration-150 ease-in-out"
            />
            <span className="w-5 h-5 text-[11px] rounded-full flex items-center justify-center bg-black text-white absolute top-0 right-0 group-hover:bg-primary transition-all duration-150 ease-in-out">
              {cartItems.length}
            </span>
          </div>
          <Link
            to="/"
            className="flex flex-col items-center justify-center w-[130px] "
          >
            <h1 className=" text-primary text-[35px] m-0 font-bold">LILO</h1>
            <p className=" text-textColor text-[17px]">Jewelry Store</p>
          </Link>
          <div className=" cursor-pointer relative ">
            <div
              onClick={() => {
                setShowMenu(!showMenu);
                setDrop(false);
              }}
              className="w-[40px] h-[40px] bg-slate-200 flex items-center justify-center rounded-full shadow-lg"
            >
              {!info ? (
                <FaUserAlt
                  size={20}
                  className=" hover:text-primary transition-all duration-150 ease-in-out"
                />
              ) : (
                <img
                  src={info.photoURL}
                  alt="user"
                  className=" w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            {showMenu && (
              <motion.div
                transition={{ ease: "easeOut", duration: 0.5 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex flex-col  w-[150px] absolute right-4 top-12 drop-shadow-xl bg-slate-100 rounded-md overflow-hidden"
              >
                {!info && (
                  <p
                    onClick={getUser}
                    className="flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                  >
                    LogIn
                    <MdLogin />
                  </p>
                )}
                {(info && info.email === "khaledarib995@gmail.com") ||
                (info && info.email === "khaledlakamora1995@gmail.com") ? (
                  <NavLink
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    to="dashBored/addItem"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-5 text-primary text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                        : "flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                    }
                  >
                    Add item
                    <FaPlus />
                  </NavLink>
                ) : (
                  ""
                )}
                <ul className="flex flex-col  text-textColor h-full items-start">
                  <li className="h-full w-full flex items-center justify-start p-3 cursor-pointer  hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out ">
                    <NavLink
                      onClick={() => {
                        setShowMenu(!showMenu);
                      }}
                      className={({ isActive }) =>
                        isActive ? "text-primary w-full" : "text-black w-full"
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="h-full w-full flex items-center justify-start p-3 cursor-pointer  hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out ">
                    <NavLink
                      onClick={() => {
                        setShowMenu(!showMenu);
                      }}
                      className={({ isActive }) =>
                        isActive ? "text-primary w-full" : "text-black w-full"
                      }
                      to="about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="h-full w-full flex items-center justify-start p-3 cursor-pointer  hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out">
                    <NavLink
                      onClick={() => {
                        setShowMenu(!showMenu);
                      }}
                      className={({ isActive }) =>
                        isActive ? "text-primary w-full" : "text-black w-full"
                      }
                      to="contact"
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
                {info && (
                  <>
                    <Link
                      className="flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                      to="ordersHistory"
                      onClick={() => {
                        setShowMenu(false);
                      }}
                    >
                      Orders
                      <MdManageHistory />
                    </Link>
                    <p
                      onClick={outUser}
                      className="flex items-center gap-5 text-lg p-3 hover:text-primary hover:bg-slate-200 transition-all duration-150 ease-in-out"
                    >
                      Logout
                      <MdLogout />
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`flex md:hidden absolute -z-50 ${
          drop ? "top-20" : "bottom-0"
        } transition-all duration-200  left-[50%] translate-x-[-50%]  w-[80%] py-4 justify-center items-center bg-slate-100 rounded-b-lg`}
      >
        <ul className="flex gap-7 flex-wrap text-textColor h-full items-center justify-center">
          <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] cursor-pointer '>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="shop/rings"
            >
              RINGS
            </NavLink>
          </li>
          <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] cursor-pointer '>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="shop/bracelets"
            >
              BRACELETS
            </NavLink>
          </li>
          <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] cursor-pointer '>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="shop/earrings"
            >
              EARRINGS
            </NavLink>
          </li>
          <li className='h-full flex items-center justify-center hover:text-primary transition-all duration-200 ease-in-out relative before:content[""] before:absolute before:w-0 before:bg-primary before:h-[3px] cursor-pointer '>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-black"
              }
              to="shop/neklaces"
            >
              NEKLACES
            </NavLink>
          </li>
        </ul>
        <div
          onClick={() => {
            setDrop(!drop);
            setShowMenu(false);
          }}
          className=" absolute w-[30px] h-[30px] left-[50%] top-[110%] translate-x-[-50%] cursor-pointer rounded-full bg-slate-50 flex items-center justify-center hover:text-primary duration-150 transition-all ease-in-out"
        >
          {drop ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
