import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDate, orderData, upD } from "../utils/firebaseFunctions";
import { useNavigate } from "react-router";
import { setCartItem } from "../redux/CartSlice";
import { Link } from "react-router-dom";
import { setItems } from "../redux/products";

const alg = [
  "Adrar",
  "Ain Defla",
  "Ain Temouchent",
  "Alger",
  "Annaba",
  "Batna",
  "Bechar",
  "Bejaia",
  "Biskra",
  "Blida",
  "Bordj Bou Arreridj",
  "Bouira",
  "Boumerdes",
  "Chlef",
  "Constantine",
  "Djelfa",
  "El Bayadh",
  "El Oued",
  "El Tarf",
  "Ghardaia",
  "Guelma",
  "Illizi",
  "Jijel",
  "Khenchela",
  "Laghouat",
  "Muaskar",
  "Medea",
  "Mila",
  "Mostaganem",
  "M'Sila",
  "Naama",
  "Oran",
  "Ouargla",
  "Oum el Bouaghi",
  "Relizane",
  "Saida",
  "Setif",
  "Sidi Bel Abbes",
  "Skikda",
  "Souk Ahras",
  "Tamanghasset",
  "Tebessa",
  "Tiaret",
  "Tindouf",
  "Tipaza",
  "Tissemsilt",
  "Tizi Ouzou",
  "Tlemcen",
];
function CheckOut() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [total, setTotle] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newData, setNewData] = useState([]);
  const info = useSelector((state) => state.user.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTotle(0);
    cartItems.map((ele) => {
      if (ele.onSale) {
        return setTotle((prev) => {
          return prev + Number(ele.newPrice) * Number(ele.num);
        });
      } else {
        return setTotle((prev) => {
          return prev + Number(ele.price) * Number(ele.num);
        });
      }
    });
  }, [cartItems]);
  const order = (e) => {
    e.preventDefault();
    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !phone ||
      city === "chosse your city" ||
      !cartItems
    ) {
      toast.error("Required fields can't be empty❌", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    } else {
      const data = {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
        phone: phone,
        items: cartItems,
        ui: info.uid,
        sened: false,
        dateOfOrder: `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`,
      };
      orderData(data, info.uid);
      newData.map((ele) => {
        return upD(ele.id, ele, "Jewelry");
      });
      getDate().then((res) => {
        dispatch(setItems(res));
      });
      dispatch(setCartItem([]));

      localStorage.removeItem("cart");
      setEmail("");
      setFirstName("");
      setLastName("");
      setCity("");
      setAddress("");
      setPhone("");
      navigate("/vuecart/orderCom");

      toast.success("Your order has been placed successfully👍", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  useEffect((ele) => {
    cartItems.map((ele) => {
      return setNewData((prev) => {
        return [
          ...prev,
          { ...ele, stock: Number(ele.stock) - Number(ele.num), num: 1 },
        ];
      });
    });
  }, []);

  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 sm:justify-between ">
          <div className="w-full sm:w-[58%]">
            <p className="text-2xl font-semibold text-gray-500 mb-3 order-1 sm:-order-1">
              CUSTOMER INFORMATION
            </p>
            <form onSubmit={order} className="flex flex-col w-full gap-3 ">
              <input
                type="email"
                placeholder="Email..."
                className="h-[40px] px-2 border block text-lg focus:outline-primary rounded-md "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="flex flex-wrap items-center justify-between ">
                <input
                  type="text"
                  placeholder="First name..."
                  className="h-[40px] w-full sm:w-[49%] px-2 border block text-lg focus:outline-primary rounded-md "
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <input
                  type="text"
                  placeholder="Last name..."
                  className="h-[40px] px-2 border w-full sm:w-[49%] block text-lg focus:outline-primary rounded-md "
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <select
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className=" h-[40px] border focus:outline-primary rounded-md cursor-pointer text-lg px-2"
              >
                <option value="chosse your city">Chosse your city</option>
                {alg.map((ele) => {
                  return (
                    <option key={ele} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                placeholder="Enter your address... "
                className="h-[40px] w-full  px-2 border block text-lg focus:outline-primary rounded-md "
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <input
                type="tel"
                placeholder="Phone number... "
                className="h-[40px] w-full  px-2 border block text-lg focus:outline-primary rounded-md "
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <div className="w-full h-[100px] border rounded-lg flex items-center justify-center bg-red-300">
                <p className=" text-xl text-center  sm:text-2xl text-white">
                  Please enter your correct information for faster delivery 😊
                </p>
              </div>
              <button
                type="submit"
                className="w-[200px] h-[50px] mx-auto text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
              >
                PLACE ORDER: {total}DA
              </button>
            </form>
          </div>
          <div className="w-full sm:w-[38%] -order-1 sm:order-1">
            <p className="text-2xl font-semibold text-gray-500 mb-3">
              YOUR ORDER
            </p>
            <div className="border rounded-md">
              <div className="flex justify-between items-center border-b  py-2 px-4 ">
                <p className="text-xl text-gray-500 ">Product</p>
                <p className="text-xl text-gray-500 ">Subtotal</p>
              </div>
              <>
                {cartItems.map((ele) => {
                  return (
                    <div
                      key={ele.id}
                      className="flex justify-between items-center  px-4 py-2 border-b w-full"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-[50%] ">
                        <div className="h-[60px] w-[80px] border rounded-md ">
                          <img
                            src={ele.imgUrl}
                            alt="item"
                            className="w-full h-full object-cover rounded-md "
                          />
                        </div>
                        <p className="text-lg font-semibold ">{ele.title}</p>
                      </div>
                      <p className="text-xl">
                        {ele.onSale
                          ? Number(ele.num) * Number(ele.newPrice)
                          : Number(ele.num) * Number(ele.price)}
                        DA
                      </p>
                    </div>
                  );
                })}
              </>
              <div className="px-4 py-2 flex justify-between items-center w-full">
                <p className=" font-semibold text-lg">Total:</p>
                <p className=" font-semibold text-xl">{total}DA</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-red-600 text-3xl mb-10 font-bold">
            Checkout is not available while your cart is empty.
          </h1>
          <Link
            to="/"
            className="w-[180px] h-[50px] mx-auto text-lg rounded-xl text-primary flex justify-center items-center border border-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out"
          >
            RETURN TO SHOP
          </Link>
        </div>
      )}
    </>
  );
}

export default CheckOut;
