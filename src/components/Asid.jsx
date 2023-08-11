import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
function Asid() {
  return (
    <>
      <div className="md:min-h-screen relative bg-slate-100 shadow-2xl w-full pt-28 px-5 md:w-[300px] pb-8 flex flex-col md-gap-0 gap-6 items-center justify-between ">
        <div className=" md:fixed md:top-[50%] md:translate-y-[-50%] md:left-0  bg-slate-100  px-5  pb-8 flex flex-col md-gap-0 gap-6 items-center justify-between">
          <h1 className="text-center text-3xl text-primary font-bold">
            Dashboard
          </h1>
          <ul className="flex md:flex-col flex-wrap gap-6 ">
            <li className=" text-lg hover:text-primary  transition-all duration-200 ease-in-out">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="/dashBored/addItem"
              >
                Add Item
              </NavLink>
            </li>
            <li className=" text-lg hover:text-primary  transition-all duration-200 ease-in-out">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="/dashBored/removeItem"
              >
                Remove Item
              </NavLink>
            </li>
            <li className=" text-lg hover:text-primary  transition-all duration-200 ease-in-out">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="/dashBored/editItmes"
              >
                Edit Item
              </NavLink>
            </li>
            <li className=" text-lg hover:text-primary  transition-all duration-200 ease-in-out">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="/dashBored/newCollection"
              >
                New Collection
              </NavLink>
            </li>
            <li className=" text-lg hover:text-primary  transition-all duration-200 ease-in-out">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-black"
                }
                to="/dashBored/OrdersMangment"
              >
                Oreders
              </NavLink>
            </li>
          </ul>
          <div>
            <ul className="flex gap-5 items-center">
              <li>
                <FaFacebook />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaTwitter />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Asid;
