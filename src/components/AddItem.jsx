import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete, MdTitle } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { motion } from "framer-motion";
////
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firestoreconfig";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { saveData, getDate } from "../utils/firebaseFunctions";
import { useDispatch } from "react-redux";
import { setItems } from "../redux/products";

function AddItem() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [discription, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [getimage, setGetImgae] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImg = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshote) => {},
      (error) => {
        setLoading(false);
        toast.error("Errore while uploading : try again😔", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((res) => {
          setLoading(false);
          setGetImgae(res);
          toast.success("Image uploaded successfully😊", {
            position: "top-center",
            theme: "dark",
            autoClose: 2000,
          });
        });
      }
    );
  };
  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, getimage);
    deleteObject(deleteRef).then(() => {
      setGetImgae(null);
      setLoading(false);
      toast.success("Image deleted successfully👍", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    });
  };

  const create = (e) => {
    e.preventDefault();
    try {
      if (
        !title ||
        title === "" ||
        !category ||
        !discription ||
        !price ||
        !stock ||
        !getimage ||
        category === "Select Category"
      ) {
        toast.error("Required fields can't be empty❌", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imgUrl: getimage,
          discription: discription,
          price: price,
          stock: stock,
          category: category,
          newPrice: "",
          onSale: false,
          num: "1",
        };
        saveData(data);
        setCategory("Select Category");
        setTitle("");
        setDescription("");
        setGetImgae(null);
        setStock("");
        setPrice("");
        toast.success("Item added successfully👍", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } catch (error) {}
    fetchItems();
  };

  const fetchItems = async () => {
    await getDate().then((res) => {
      dispatch(setItems(res));
    });
  };
  return (
    <motion.div
      transition={{ ease: "easeOut", duration: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="md:w-[100% - 300px] w-full h-full"
    >
      <div className="h-full px-14  flex flex-col items-center">
        <form
          onSubmit={(e) => create(e)}
          className=" w-full h-auto p-2 border gap-4 rounded-lg "
        >
          <div className="pl-10 border-b pb-1 relative max-w-[600px] mx-auto mb-3">
            <input
              type="text"
              value={title}
              placeholder="Give me a title..."
              className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg"
              onChange={(e) => setTitle(e.target.value)}
            />
            <MdTitle
              size={30}
              className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
            />
          </div>
          <div className="mb-3">
            <select
              name=""
              id=""
              className="max-w-[600px] mx-auto text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option>Select Category</option>
              <option value="RINGS">RINGS</option>
              <option value="BRACELETS">BRACELETS</option>
              <option value="EARRINGS">EARRINGS</option>
              <option value="NEKLACES">NEKLACES</option>
            </select>
          </div>
          <div className="flex items-center justify-center max-w-[600px] h-52 mx-auto mb-3 ">
            {loading ? (
              <HashLoader color="#36d7b7" />
            ) : !getimage ? (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadImg(e)}
                />
              </label>
            ) : (
              <div className=" relative w-full h-full rounded-xl">
                <img
                  src={getimage}
                  alt="img"
                  className="h-full w-full object-cover  rounded-xl"
                />
                <button
                  onClick={deleteImage}
                  type="button"
                  className="text-white absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-cl cursor-pointer outline-none hover:shadow-xl duration-200 transition-all ease-in-out"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
          <div className="max-w-[600px] mb-3 mx-auto">
            <textarea
              name=""
              id=""
              placeholder="Description..."
              className="w-full h-[95px] resize-none rounded-lg  border border-slate-400 p-1 focus:outline-none"
              onChange={(e) => setDescription(e.target.value)}
              value={discription}
            ></textarea>
          </div>
          <div className="flex flex-wrap items-center justify-between max-w-[600px] md:gap-0 gap-3 mx-auto mb-4">
            <div className="pl-10 border-b pb-1 relative w-[100%] md:w-[48%] ">
              <input
                type="text"
                placeholder="Stock..."
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg"
                onChange={(e) => {
                  if (!isNaN(parseInt(e.target.value))) {
                    setStock(parseInt(e.target.value));
                  } else {
                    setStock("");
                  }
                }}
                value={stock}
              />
              <AiOutlineStock
                size={30}
                className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
              />
            </div>
            <div className="pl-10 border-b pb-1 relative w-[100%] md:w-[48%] ">
              <input
                type="text"
                placeholder="Price..."
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg"
                onChange={(e) => {
                  if (!isNaN(parseInt(e.target.value))) {
                    setPrice(parseInt(e.target.value));
                  } else {
                    setPrice("");
                  }
                }}
                value={price}
              />
              <RiMoneyDollarCircleLine
                size={30}
                className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-2 block mx-auto border border-primary px-4 bg-white font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white duration-200 ease-in-out transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Item
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default AddItem;
