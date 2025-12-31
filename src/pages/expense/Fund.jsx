import React, { useEffect, useState } from "react";
//icons
import { BiWallet } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
//hooks
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../../hooks/useFirestore";
import useWindowSize from "../../hooks/useWindowSize";
//images

import { IoCheckmarkCircle } from "react-icons/io5";
import { Form } from "react-router-dom";
//toast
import toast from "react-hot-toast";
//firebase imports
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

//context
import useGlobalContext from "../../hooks/useGlobalContext";
import { useAllCollection } from "../../hooks/useAllCollection";

//=================== Main function =============================================================================================================================
function Fund() {
  //react hook
  const fileRef = useRef();
  const storage = getStorage();
  const { width } = useWindowSize();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      initialValue: "",
      goalValue: "",
      note: "",
    },
  });
  const [file, setFile] = useState("");
  const [disableImg, setDisableImg] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [initialSum, setInitialSum] = useState("");
  const [goalSum, setGoalSum] = useState("");
  //useFirestore
  const { addDocument, deleteDocument } = useFirestore();
  //global context
  const { user, isDark } = useGlobalContext();

  //onSubmit for react hook form
  const onSubmit = async (data) => {
    setDataLoading(true);
    await addDocument("Funds", {
      ...data,
      file,
      userId: user.uid,
      time: new Date(),
    });

    setDataLoading(false);

    setFile("");
    reset();
    document.getElementById("add-fund").close();
  };

  // firebase dan data olish
  const { data: funds } = useAllCollection("Funds", ["userId", "==", user.uid]);

  // Jamg'armalar statistikasini hisoblash
  useEffect(() => {
    if (!funds) return;
    if (funds.length > 0) {
      let initialSUm = 0;
      let goalSum = 0;
      funds.forEach((item) => {
        initialSUm += Number(item.initialValue);
        goalSum += Number(item.goalValue);
      });

      setInitialSum(initialSUm);
      setGoalSum(goalSum);
    }
  }, [funds]);

  //rasm uchun firestoredan URL olish
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageLoading(true);

    const fileRef = ref(storage, `ProfileImage/${Date.now()}_${file.name}`);

    try {
      await uploadBytes(fileRef, file);

      const imageURL = await getDownloadURL(fileRef);
      setFile(imageURL);
      setDisableImg(true);
      setImageLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setImageLoading(false);
    }
  };

  //Fundlarni o'chirish
  const handleFundDelete = (id) => {
    deleteDocument("Funds", id);
  };
  // fundlarni UPDATE qilish
  const updateFor = async (id, num) => {
    setDisableBtn(true);
    const update = doc(db, "Funds", id);
    const docData = await getDoc(update);
    if (docData.exists()) {
      const oldValue = docData.data().initialValue;

      const newValue = Number(oldValue) + num;

      await updateDoc(update, {
        initialValue: newValue,
        last_updated_at: new Date(),
      });
      setDisableBtn(false);
    } else {
      console.log("document topilmadi");
      setDisableBtn(false);
    }
  };

  // textlarni qisqartirish
  const shortText = (text, max) => {
    return text.length > max ? text.slice(0, max) + "..." : text;
  };
  return (
    <div className="w-full min-h-[100vh] px-2 md:px-[5%]  lg:px-[10%] xl:px-[10%] 2xl:px-[15%] flex flex-col gap-5 pt-10 pb-10">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-gradient-to-br flex justify-center items-center from-indigo-500 to-purple-700 from-0% rounded-2xl">
          <BiWallet className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2
            className={`text-3xl font-semibold text-[#18181B] ${
              isDark ? "text-[#18181B]" : "text-white"
            }`}
          >
            All funds
          </h2>
          <p
            className={`text-lg font-thin ${
              isDark ? "text-[#18181B]" : "text-white"
            } `}
          >
            Manage your financial goals
          </p>
        </div>
      </div>
      <div className="fund-container w-full bg-base-100 rounded-xl p-5   shadow border border-base-content/10 flex flex-col gap-5">
        <p className="font-normal  text-slate-500">
          In this section, you can create and track your savings for different
          goals. Set a target amount for each savings and keep track of the
          progress.
        </p>
        <div className="card-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            className={`card border-none p-4 rounded-3xl flex flex-col gap-3 bg-gradient-to-br ${
              isDark
                ? "from-blue-100/50 to-blue-200/50 "
                : "from-blue-900 to-blue-900"
            } `}
          >
            <p className="flex gap-2 items-center">
              <FaArrowTrendUp className="w-5 h-5 text-blue-500" />{" "}
              <span>Total saved</span>
            </p>
            <p className="text-lg">${initialSum > 0 ? initialSum : "00.0"}</p>
          </div>
          <div
            className={`card border-none p-4 rounded-3xl flex flex-col gap-3 bg-gradient-to-br  ${
              isDark
                ? "from-purple-100/50 to-purple-200/50"
                : "from-purple-800 to-purple-900"
            }`}
          >
            <p className="flex gap-2 items-center">
              <LuTarget className="w-5 h-5 text-purple-500" />{" "}
              <span>Total goals</span>
            </p>
            <p className="text-lg">${goalSum ? goalSum : "00.0"}</p>
          </div>
          <div
            className={`card border-none p-4 rounded-3xl flex flex-col gap-3 bg-gradient-to-br ${
              isDark
                ? " from-green-100/50 to-green-200/50"
                : "from-green-800 to-green-900"
            }`}
          >
            <p className="flex gap-2 items-center">
              <BiWallet className="w-5 h-5 text-green-500" />{" "}
              <span>Number of funds</span>
            </p>
            <p className="text-lg">{funds?.length}</p>
          </div>
        </div>
      </div>

      <div className="md:mt-4 flex justify-between items-center">
        <p className="text-base-content">My funds</p>
        <button
          onClick={() => document.getElementById("add-fund").showModal()}
          className="rounded-md px-8 py-2 bg-[#18181B] hover:bg-[#303036] text-white"
        >
          + New fund
        </button>
      </div>

      <div className="fund-cards  grid gap-5  grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {funds?.map((fund) => {
          const progress =
            (Number(fund.initialValue) / Number(fund.goalValue)) * 100;

          const leftValue = Number(fund.goalValue) - Number(fund.initialValue);

          const maxSize =
            width <= 600
              ? 50
              : width < 767
              ? 100
              : width < 1300
              ? 17
              : width > 1400
              ? 40
              : width > 1350
              ? 30
              : width > 1300
              ? 20
              : 40;
          return (
            <div
              key={fund._id}
              className="card overflow-hidden relative shadow-xl pt-12 px-3 md:px-4 xl:px-5 pb-6 rounded-2xl bg-base-100 flex flex-col gap-6"
            >
              <span
                className={`absolute top-5 right-2 badge ${
                  progress < 100 ? "bg-purple-500" : "bg-green-500"
                } text-white`}
              >
                {progress < 100 ? "In progress" : "Completed"}
              </span>
              <span
                className={`absolute w-full h-3 left-0 top-0  ${
                  progress < 50
                    ? "bg-red-500/70"
                    : progress >= 100
                    ? "bg-green-500"
                    : "bg-yellow-500"
                } `}
              ></span>
              <div className="card-header flex justify-between items-center gap-5">
                <div className="flex gap-4 items-center">
                  <div className="image overflow-hidden w-14 h-14 rounded-md bg-base-200 ">
                    <img src={fund?.file} className="object-cover" alt="" />
                  </div>
                  <div>
                    <h2 className="font-medium ">
                      {shortText(fund.title, maxSize)}
                    </h2>
                    <p>
                      {progress < 100 ? progress.toFixed(1) : "100.0"}%
                      completed
                    </p>
                  </div>
                </div>

                <div className="dropdown dropdown-left">
                  <div tabIndex={0} role="button" className="">
                    <GoTrash className="w-5 h-5 text-gray-500" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-auto p-2 shadow"
                  >
                    <li onClick={() => handleFundDelete(fund._id)}>
                      <a className="text-red-600">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className=" w-full h-4 rounded-full overflow-hidden relative bg-base-content/10">
                <span
                  className="absolute top-0 left-0  h-full bg-base-content inline-block"
                  style={{ width: `${progress}%` }}
                ></span>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className={`${progress >= 100 && "text-green-500"}`}>
                    Current amount:
                  </span>
                  <span className={`${progress >= 100 && "text-green-500"}`}>
                    {fund.initialValue < fund.goalValue ? (
                      <span>
                        ${fund?.initialValue ? fund.initialValue : "0.0"}
                      </span>
                    ) : (
                      <span> ${fund.goalValue}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Goal:</span>
                  <span>${fund.goalValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Left:</span>
                  <span className="text-red-500">
                    ${leftValue > 0 ? leftValue : "00.0"}
                  </span>
                </div>
              </div>
              <div className="buttons flex gap-2">
                <button
                  disabled={disableBtn}
                  onClick={() => updateFor(fund._id, 50)}
                  className="py-2 disabled:opacity-100 disabled:bg-transparent flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50"
                >
                  + 50$
                </button>
                <button
                  disabled={disableBtn}
                  onClick={() => updateFor(fund._id, 100)}
                  className="py-2 disabled:opacity-100 disabled:bg-transparent flex-1 btn bg-transparent hover:bg-slate-400/50 shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-slate-200/50"
                >
                  + 100$
                </button>
                <button
                  disabled={disableBtn}
                  onClick={() => updateFor(fund._id, 1000)}
                  className="py-2 disabled:bg-[#18181B] disabled:text-gray-400 flex-1 btn bg-[#18181B] hover:bg-[#2f2f36] shadow-none text-[16px] btn-sm h-11 font-medium rounded-md border-2 border-none text-white"
                >
                  + 1K
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {funds?.length === 0 && (
        <div className="w-full p-5 bg-base-100 border border-base-content/10 shadow rounded-xl flex justify-center items-center">
          <p>Now you have not funds. Try to new one!</p>
        </div>
      )}
      {!funds && (
        <div className="w-full h-[50vh] flex justify-center items-center bg-transparent">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <dialog id="add-fund" className="modal">
        <div className="modal-box max-w-sm ">
          <Form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className=" w-full py-6 flex flex-col gap-3 rounded-md"
          >
            <span className=" flex items-center gap-1 font-medium">
              <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
              Create new fund!
            </span>
            <div className="flex flex-col gap-2">
              <label className="flex-1 flex flex-col ">
                <span className="text-sm ">Fund title</span>
                <input
                  {...register("title")}
                  type="text"
                  step="any"
                  className="input input-sm border-2 border-slate-200/80 focus:outline-none w-full rounded-sm "
                  placeholder="Enter goal name"
                />
              </label>
              <label className="flex-1 flex flex-col ">
                <span className="text-sm ">How much are you goin to gain?</span>
                <input
                  {...register("goalValue")}
                  type="number"
                  className="input input-sm  border-2 border-slate-200/80 w-full focus:outline-none rounded-sm"
                  placeholder="Enter number"
                />
              </label>
            </div>

            <label className="flex-1 flex flex-col ">
              <span className="text-sm ">
                Initial value <span className="italic">(optional)</span>
              </span>
              <input
                {...register("initialValue")}
                type="number"
                className="input input-sm  border-2 border-slate-200/80 w-full focus:outline-none rounded-sm"
                placeholder="Enter number"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm">
                Create some note! <span className="italic">(optional)</span>
              </span>
              <textarea
                {...register("note")}
                id="textarea"
                placeholder="Notes..."
                className="textarea  border-2 border-slate-200/80 w-full focus:outline-none rounded-sm"
              ></textarea>
            </label>

            <label>
              <input
                onChange={handleImageUpload}
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                disabled={disableImg}
                onClick={() => fileRef.current.click()}
                className="w-full h-10 rounded-sm bg-[#18181B] disabled:bg-[#313136]  text-sm text-white"
              >
                {imageLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="text-white">Loading...</span>
                  </div>
                ) : !file ? (
                  <span>
                    Add photo <span className="italic">(optional)</span>
                  </span>
                ) : (
                  "Image loaded"
                )}
              </button>
            </label>

            <div className="flex gap-5 justify-end">
              <button
                type="button"
                onClick={() => document.getElementById("add-fund").close()}
                className="btn btn-sm btn-outline rounded-sm border-slate-200 font-normal"
              >
                Cancel
              </button>
              <button
                disabled={dataLoading}
                className="btn btn-sm w-[130px] rounded-sm border-none disabled:bg- bg-[#18181B] text-white font-normal hover:bg-[#3a3a41]"
              >
                {dataLoading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}{" "}
                Create fund
              </button>
            </div>
          </Form>
        </div>
      </dialog>
    </div>
  );
}

export default Fund;
