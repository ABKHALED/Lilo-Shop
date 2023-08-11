import { NavBar, Footer, Info, Cart, CartVue } from "./components/index";
import {
  About,
  Contact,
  DashBored,
  Home,
  No,
  OrdersHistory,
  Shop,
} from "./pages/index";
import { AnimatePresence } from "framer-motion";
import { Await, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "./redux/products";
import { getDate } from "./utils/firebaseFunctions";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [t, setT] = useState(false);
  const info = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.cartShow);
  const fetchItems = async () => {
    await getDate().then((res) => {
      dispatch(setItems(res));
    });
  };

  useEffect(() => {
    fetchItems();
    if (
      info &&
      (info.email === "khaledarib995@gmail.com" ||
        info.email === "khaledlakamora1995@gmail.com")
    ) {
      setT(true);
    }
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col relative">
        <ToastContainer />
        {cart && <Cart />}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashBored/*" element={t ? <DashBored /> : <No />} />
          <Route path="shop/:id" element={<Shop />} />
          <Route path="/productInfo/:id" element={<Info />} />
          {info && <Route path="vuecart/*" element={<CartVue />} />}
          {info && <Route path="/ordersHistory" element={<OrdersHistory />} />}
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
