import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdTitle, MdHelpOutline, MdDelete } from "react-icons/md";
import { HashLoader } from "react-spinners";
import { storage } from "../firestoreconfig";
import { toast } from "react-toastify";
import { upD } from "../utils/firebaseFunctions";
import { motion } from "framer-motion";
function NewCollecion() {
  const id = "1684541324958";
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [subject, setSubject] = useState("");
  const [discription, setDescription] = useState("");
  const [cat, setCat] = useState("");
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
          setImg(res);
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
    const deleteRef = ref(storage, img);
    deleteObject(deleteRef).then(() => {
      setImg(null);
      setLoading(false);
      toast.success("Image deleted successfully👍", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    });
  };
  const hero = async (e) => {
    e.preventDefault();
    try {
      if (
        !title ||
        !subject ||
        !discription ||
        !img ||
        !cat ||
        cat === "Select Category"
      ) {
        toast.error("Required fields can't be empty❌", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else {
        const data = {
          title: title,
          subject: subject,
          discription: discription,
          imgUrl: img,
          cat: cat,
        };

        upD(id, data, "Hero");
        toast.success("Item added successfully👍", {
          position: "top-center",
          theme: "dark",
          autoClose: 2000,
        });
        setTitle("");
        setImg(null);
        setSubject("");
        setDescription("");
        setCat("");
      }
    } catch (error) {}
  };
  return (
    <motion.div
      transition={{ ease: "easeOut", duration: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="w-full h-full "
    >
      <div className="h-full px-14  ">
        <h1 className="mb-3 text-center text-xl">
          Here you can change all the information in the hero section
        </h1>
        <form
          onSubmit={(e) => hero(e)}
          className="w-[100%] md:w-[90%] border rounded-xl py-3 px-4 md:px-0  "
        >
          <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between mx-auto gap-3 md:gap-0 mb-3">
            <div className="pl-10 border-b pb-1 relative w-full md:w-[49%]  ">
              <input
                type="text"
                value={subject}
                placeholder="subject... "
                className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg"
                onChange={(e) => setSubject(e.target.value)}
              />
              <MdHelpOutline
                size={30}
                className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
              />
            </div>
            <div className="w-full md:w-[49%]">
              <select
                name=""
                id=""
                className="max-w-[600px] mx-auto text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  if (e.target.value === "Select Category") {
                    setCat("");
                  } else {
                    setCat(e.target.value);
                  }
                }}
                value={cat}
              >
                <option value="Select Category">Select Category</option>
                <option value="rings">RINGS</option>
                <option value="bracelets">BRACELETS</option>
                <option value="earrings">EARRINGS</option>
                <option value="neklaces">NEKLACES</option>
              </select>
            </div>
          </div>
          <div className="pl-10 border-b pb-1 relative w-full md:w-[80%] mx-auto mb-3">
            <input
              type="text"
              value={title}
              placeholder="Hero title...."
              className="pl-1 w-full placeholder:italic placeholder:text-slate-400 focus:outline-none text-lg"
              onChange={(e) => setTitle(e.target.value)}
            />
            <MdTitle
              size={30}
              className=" absolute left-3 top-[50%] translate-y-[-50%] text-gray-500"
            />
          </div>
          <div className="w-full md:w-[80%] mb-3 mx-auto">
            <textarea
              value={discription}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              className="w-full h-[100px] resize-none rounded-lg text-xl  border border-slate-400 p-1 focus:outline-none"
            ></textarea>
          </div>
          <div className="flex items-center justify-center w-full md:w-[80%] h-52 mx-auto mb-3 ">
            {loading ? (
              <HashLoader color="#36d7b7" />
            ) : !img ? (
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

export default NewCollecion;
