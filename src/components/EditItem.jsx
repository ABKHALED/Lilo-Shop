import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineStock } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete, MdTitle } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { storage } from "../firestoreconfig";
import { toast } from "react-toastify";
import { getDate, upD } from "../utils/firebaseFunctions";
import { useDispatch } from "react-redux";
import { setItems } from "../redux/products";

function EditItem({ id, items, setEdit }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(items.title);
  const [category, setCategory] = useState(items.category);
  const [img, setImg] = useState(items.imgUrl);
  const [discription, setDescription] = useState(items.discription);
  const [price, setPrice] = useState(items.price);
  const [onSale, setOnSale] = useState(items.onSale);
  const [newPrice, setNewPrice] = useState(items.newPrice);
  const [stock, setStock] = useState(items.stock);
  const [isLoding, setIsLoding] = useState(false);
  const [imgDone, setImgDone] = useState(false);
  const uploadImg = (e) => {
    setIsLoding(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshote) => {},
      (error) => {
        setIsLoding(false);
        toast.error("Errore while uploading : try again😔", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((res) => {
          setIsLoding(false);
          setImg(res);
          setImgDone(true);
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
    setIsLoding(true);
    const deleteRef = ref(storage, img);
    deleteObject(deleteRef).then(() => {
      setImg(null);
      setIsLoding(false);
      setImgDone(false);
      toast.success("Image deleted successfully👍", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    });
  };
  const updateData = async (id, e) => {
    e.preventDefault();
    try {
      if (
        !discription ||
        !img ||
        !price ||
        ((stock ?? stock) && !stock) ||
        !title ||
        (onSale && !newPrice)
      ) {
        toast.error("Required fields can't be empty❌", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else {
        const data = {
          category: category,
          discription: discription,
          id: items.id,
          imgUrl: img,
          price: price,
          stock: stock,
          title: title,
          newPrice: newPrice,
          onSale: onSale,
        };
        setEdit(false);
        upD(id, data, "Jewelry");
        await getDate().then((res) => {
          dispatch(setItems(res));
        });
        toast.success("Item edited successfully👍", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went worng: try again😔", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  return (
    <motion.div
      transition={{ ease: "easeOut", duration: 0.7 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className=" fixed w-full h-full bg-[#00000082] top-0 left-0 flex justify-center items-center z-10 pt-20 "
    >
      <div className="w-[90%] sm:w-[70%] h-[95%] bg-white rounded-xl relative overflow-y-scroll">
        <span
          onClick={() => setEdit(false)}
          className=" sticky block w-fit top-1 pr-1 ml-auto  text-red-500 cursor-pointer hover:text-red-400 transition-all duration-200 ease-in-out"
        >
          <AiFillCloseCircle size={29} />
        </span>
        <form
          onSubmit={(e) => updateData(items.id, e)}
          className="px-5 pt-9 pb-3"
        >
          <div className="flex flex-col items-center w-full">
            <div className="pl-10 border-b pb-1 relative w-[90%] mb-10">
              <input
                type="text"
                value={title}
                placeholder="Give me a title..."
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-xl"
                onChange={(e) => setTitle(e.target.value)}
              />
              <MdTitle
                size={30}
                className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
              />
            </div>
            <div className="w-[90%]  mb-10">
              <select
                disabled
                className=" cursor-not-allowed mx-auto text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex flex-col  items-center justify-between w-full gap-10">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-5 lg:gap-0 flex-wrap w-[90%]">
                <div className="lg:w-[48%] w-[90%] aspect-square relative">
                  <span className=" absolute top-3 left-[50%] translate-x-[-50%] w-[50%] text-center py-1 rounded-md font-bold text-base block  bg-white text-red-500">
                    Previous image
                  </span>
                  <img
                    src={items.imgUrl}
                    className="w-full h-full object-cover rounded-md"
                    alt="item"
                  />
                </div>
                <div className="lg:w-[48%] h-full flex items-center justify-center w-[90%] aspect-square">
                  {isLoding ? (
                    <HashLoader color="#a86e3b" />
                  ) : !imgDone ? (
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col relative items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <span className=" drop-shadow-lg absolute top-3 left-[50%] translate-x-[-50%] w-[50%] text-center py-1 rounded-md font-bold text-base block  bg-white text-green-500">
                        New image
                      </span>
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
                      <span className=" drop-shadow-xl absolute top-3 left-[50%] translate-x-[-50%] w-[50%] text-center py-1 rounded-md font-bold text-base block  bg-white text-green-500">
                        New image
                      </span>
                      <img
                        src={img}
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
              </div>
              <div className=" w-[90%] flex items-center justify-center">
                <textarea
                  placeholder="Description..."
                  className="w-full h-[270px] resize-none rounded-lg  border border-slate-400 py-2 px-3 focus:outline-none"
                  onChange={(e) => setDescription(e.target.value)}
                  value={discription}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mt-10 ">
              <div className="flex flex-col w-[90%]  gap-10">
                <div className="pl-10 border-b pb-1 relative w-full ">
                  <input
                    type="text"
                    placeholder="Price..."
                    className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-xl"
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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sale"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      setOnSale(e.target.checked);
                      if (!onSale) {
                        setNewPrice("");
                      }
                    }}
                    checked={onSale}
                  />
                  <label
                    className="ml-2  font-medium text-gray-900 dark:text-gray-300 text-lg"
                    htmlFor="sale"
                  >
                    Put item on sale
                  </label>
                </div>
                {onSale && (
                  <motion.div
                    transition={{ ease: "easeOut", duration: 0.7 }}
                    initial={{ opacity: 0, left: "-100px" }}
                    animate={{ opacity: 1, left: 0 }}
                    exit={{ opacity: 0, left: "-100px" }}
                    className="pl-10 border-b pb-1 relative w-full "
                  >
                    <input
                      type="text"
                      placeholder="Price after sale..."
                      className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-xl"
                      onChange={(e) => {
                        if (!isNaN(parseInt(e.target.value))) {
                          setNewPrice(parseInt(e.target.value));
                        } else {
                          setNewPrice("");
                        }
                      }}
                      value={newPrice}
                    />
                    <RiMoneyDollarCircleLine
                      size={30}
                      className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
                    />
                  </motion.div>
                )}
                <div className="pl-10 border-b pb-1 relative w-full  ">
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
                    className="absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className=" w-[120px] flex justify-center items-center h-[40px] py-2  mx-auto border border-primary px-4 bg-white font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white duration-200 ease-in-out transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Edit Item
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default EditItem;
