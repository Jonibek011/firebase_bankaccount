// Tasks.jsx
import { Form, useActionData } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useFirestore } from "../hooks/useFirestore";
// Icons & Assets
import { CiMenuKebab } from "react-icons/ci";
import emptyBox from "../assets/images/empty-box.png";
import { IoTrashOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";

import { FaFilter } from "react-icons/fa6";
import card1 from "../assets/images/tasks/image 18.png";
import card2 from "../assets/images/tasks/image 17.png";
import card3 from "../assets/images/tasks/image 19.png";
import titleBg from "../assets/images/tasks/wooden-work-desk-laptop-documents-260nw-1716833923.png";
import { LuListTodo } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { GrFlag } from "react-icons/gr";
// Context and hooks
import useGlobalContext from "../hooks/useGlobalContext";
import { useAllCollection } from "../hooks/useAllCollection";
import { useDebounce } from "../hooks/useDebounce";
// 🔁 Action: Faqat formData ni qaytaradi
export const action = async ({ request }) => {
  const formData = await request.formData();
  const taskTitle = formData.get("title");
  const taskDate = formData.get("date");
  const taskTime = formData.get("time");
  const taskCategory = formData.get("category");
  const taskBody = formData.get("body");
  const userId = formData.get("userId");

  return {
    taskTitle,
    taskDate,
    taskTime,
    taskCategory,
    taskBody,
    userId,
  };
};
//main function
function Tasks() {
  const { user, dispatch } = useGlobalContext();
  const result = useActionData();
  const { deleteDocument, updateDocument } = useFirestore();
  const modalRef = useRef();
  const formRef = useRef();
  //taskni edit qilish uchun
  const [editingModal, setEditingModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [editingModalLoading, setEditingModalLoading] = useState(false);
  const [priority, setPriority] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [mapData, setMapData] = useState(null);

  const debouncedValue = useDebounce(searchData);

  //task filter
  const [sortCompleted, setSortCompleted] = useState(false);
  const [sortPending, setSortPending] = useState(false);

  const [sendingData, setSendingData] = useState(false);

  const filterData = useMemo(() => ["userId", "==", user.uid], [user.uid]);
  const { data: collectionData } = useAllCollection("Tasks", filterData);

  useEffect(() => {
    dispatch({ type: "ADDTASK", payload: collectionData });
  }, [collectionData, dispatch]);

  // Firebase ga yozish faqat form submit qilingandan so‘ng
  useEffect(() => {
    const addTaskToFirestore = async () => {
      if (result?.taskTitle && !sendingData) {
        setSendingData(true);

        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`;
        const day = String(now.getDate()).padStart(2, "0");
        const month = months[now.getMonth()];
        const formattedDate = `${time}, ${day}-${month}`;

        const fullData = {
          ...result,
          date: formattedDate,
          taskPriority: priority,
          taskId: uuidv4(),
          status: "Pending",
        };

        try {
          await addDoc(collection(db, "Tasks"), fullData);
          formRef.current?.reset();
          modalRef.current?.close();
          setSendingData(false);
        } catch (err) {
          console.error("Firebasega yozishda xatolik:", err);
        } finally {
          setSendingData(false);
        }
      }
    };

    addTaskToFirestore();
  }, [result, priority]);

  //delete tasks
  const deleteTask = (id) => {
    deleteDocument("Tasks", id);
  };

  //changestatus
  const changeStatus = (id, currentStatus) => {
    if (currentStatus === "Completed") {
      const ConfirmMessage = window.confirm(
        "Do you want to uncomplete this task"
      );

      if (!ConfirmMessage) return;
    }

    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";

    updateDocument("Tasks", id, "status", newStatus);
  };

  //titleni qisqartirish
  const shortenText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  //edit function
  const editFunction = (task) => {
    setEditingModal(true);
    setEditingData(task);
    modalRef.current.showModal();
  };

  //form submit for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditingModalLoading(true);

    const newTitle = e.target.title.value;
    const newDate = e.target.date.value;
    const newDueTime = e.target.time.value;
    const newCategory = e.target.category.value;
    const newPriority = priority;
    const newBody = e.target.body.value;
    formRef.current.reset();
    modalRef.current.close();
    const docRef = doc(db, "Tasks", editingData._id);

    await updateDoc(docRef, {
      taskTitle: newTitle,
      taskDate: newDate,
      taskTime: newDueTime,
      taskCategory: newCategory,
      taskPriority: newPriority,
      taskBody: newBody,
    });

    setEditingData(null);
    setEditingModal(false);
    setEditingModalLoading(false);
  };

  // tasklarni filter qilish

  useEffect(() => {
    if (!collectionData) return;

    if (sortCompleted) {
      const completed = collectionData.filter((r) => r.status === "Completed");
      setMapData(completed);
      return;
    }

    if (sortPending) {
      const pending = collectionData.filter((r) => r.status === "Pending");
      setMapData(pending);
      return;
    }

    setMapData(collectionData);
  }, [collectionData, sortCompleted, sortPending]);

  useEffect(() => {
    if (!debouncedValue || debouncedValue.length < 3) {
      setMapData(collectionData);
    } else if (debouncedValue.length > 2) {
      const filterData = collectionData.filter((item) =>
        item.taskTitle?.toLowerCase().includes(debouncedValue?.toLowerCase())
      );
      setMapData(filterData);
    }
  }, [debouncedValue, collectionData]);
  useEffect(() => {
    if (!collectionData) return;
    setTotalTasks(collectionData.length);
    const filterPending = collectionData.filter(
      (item) => item.status === "Pending"
    );
    setPendingTasks(filterPending.length ? filterPending.length : 0);
    const filterCompleted = collectionData.filter(
      (item) => item.status === "Completed"
    );
    setCompletedTasks(filterCompleted.length ? filterCompleted.length : 0);
  }, [collectionData]);
  return (
    <div className="w-full min-h-[70vh] pb-6  bg-base-100  relative flex flex-col gap-8 ">
      <div>
        <div className="w-full h-64 bg-purple-500 overflow-hidden relative">
          <img
            src={titleBg}
            className="w-full z-0 h-full object-cover absolute"
            alt=""
          />
          <span className="absolute w-full h-full z-0 top-0 left-0 bg-gradient-to-r from-[#30237aea] to-[#7c1cb4d2]"></span>
          <div className="w-full h-full flex flex-col gap-3 justify-center items-center relative z-10">
            <div className="flex gap-4 items-center">
              <span className="w-14 lg:w-20 h-14 lg:h-20 flex justify-center items-center rounded-xl bg-[#5a479efd]">
                <LuListTodo className="w-10 lg:w-14 h-10 lg:h-14 text-white" />
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white">
                My To-Do List
              </h2>
            </div>
            <p className="text-gray-300 text-lg lg:text-xl">
              Stay organized and get things done
            </p>
          </div>
        </div>
        <div className="bg-base-100 p-4 flex flex-col gap-4 border-b border-base-content/10">
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
            <div className="flex justify-start gap-3 items-center w-full md:w-auto">
              <span className="p-2 rounded-lg bg-indigo-700 inline-block">
                <LuListTodo className="text-white w-6 h-6" />
              </span>
              <div>
                <h2 className="font-semibold  text-2xl">Task Management</h2>
                <p className="text-sm text-gray-500">
                  Organize and track your team's progress
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end  w-full md:w-auto">
              <button
                onClick={() => modalRef.current?.showModal()}
                className="btn btn-primary btn-xs md:btn-sm shadow-sm"
              >
                + New Task
              </button>
            </div>
          </div>
          <label className="w-full flex items-center rounded-lg bg-base-200 h-8 overflow-hidden px-4 ">
            <span>
              <LuSearch className="text-gray-400" />
            </span>
            <input
              onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              type="search"
              className="flex-1 bg-base-200 px-3 focus:border-none focus:outline-none"
              placeholder="Search tasks by title..."
            />
          </label>
        </div>
      </div>

      <div className="cards  px-3 md:px-5 max-w-screen-2xl w-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card shadow-md transition-all hover:scale-105 duration-500 p-4 bg-base-100 flex flex-col gap-4 relative">
          <img src={card1} className="w-20 absolute right-0 top-0" alt="" />
          <div>
            <h2 className="font-semibold text-lg">Total Tasks</h2>
            <p className="text-4xl  font-semibold">{totalTasks}</p>
          </div>
        </div>

        <div className="card shadow-md transition-all hover:scale-105 duration-500 p-4 bg-base-100 flex flex-col gap-4 relative">
          <img src={card2} className="w-16 absolute right-0 top-2" alt="" />
          <div>
            <h2 className="font-semibold text-lg">Pending Tasks</h2>
            <p className="text-4xl  font-semibold">{pendingTasks}</p>
          </div>
        </div>
        <div className="card shadow-md transition-all hover:scale-105 duration-500 p-4 bg-base-100 flex flex-col gap-4 relative">
          <img src={card3} className="w-20 absolute right-0 top-3" alt="" />
          <div>
            <h2 className="font-semibold text-lg">Completed Tasks</h2>
            <p className="text-4xl  font-semibold">{completedTasks}</p>
          </div>
        </div>
      </div>
      {/* =============================== FILTER ================================================= */}
      <div className="flex max-w-screen-2xl w-full mx-auto justify-start  items-center px-3 md:px-5 ">
        <div className="flex gap-4 items-center">
          <div className="shadow-sm rounded-xl shadow-cyan-800 p-1">
            <button
              onClick={() => {
                setSortCompleted(false);
                setSortPending(false);
              }}
              className="btn btn-xs md:btn-sm shadow-inner drop-shadow-md shadow-cyan-800"
            >
              All
            </button>
          </div>
          <div className="dropdown shadow-sm rounded-xl shadow-cyan-800 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-xs md:btn-sm m-1 shadow-inner drop-shadow-md shadow-cyan-800"
            >
              <FaFilter />
              Sort by
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-[1]">
              <li>
                <button
                  onClick={() => {
                    setSortCompleted(false);
                    setSortPending(true);
                  }}
                >
                  Pending
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSortPending(false);
                    setSortCompleted(true);
                  }}
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* =================================== TASKS ============================================ */}
      <div className="px-3  md:px-5 md:w-[calc(100vw-70px)]  max-w-screen-2xl mx-auto ">
        <div className=" bg-base-100  w-[calc(100vw-20px)] md:w-[calc(100vw-120px)]  max-w-full   overflow-x-auto mx-auto relative border border-base-content/10 rounded-xl  pb-16 min-h-[50vh]   ">
          <table className="table min-w-[1200px]">
            <thead>
              <tr className="">
                <th className=" max-w-14 md:max-w-28  lg:font-bold lg:text-xl  w-14 "></th>
                <th className=" lg:text-lg font-medium text-base-content/80">
                  Task
                </th>
                <th className="lg:text-lg font-medium text-base-content/80 ">
                  Status
                </th>
                <th className="lg:text-lg font-medium text-base-content/80 ">
                  Priority
                </th>
                <th className="lg:text-lg font-medium text-base-content/80 ">
                  Category
                </th>
                <th className=" lg:text-lg font-medium text-base-content/80">
                  Created
                </th>
                <th className=" lg:text-lg font-medium text-base-content/80 ">
                  Due Date
                </th>
                <th className="lg:text-lg   text-base-content/80">Options</th>
              </tr>
            </thead>
            <tbody className="">
              {mapData?.length > 0 &&
                mapData?.map((task) => {
                  return (
                    <tr
                      key={task.taskId}
                      className={` hover:bg-base-content/5  ${
                        task.status === "Completed" ? "bg-base-100" : ""
                      }`}
                    >
                      <td className=" ">
                        <div className="flex flex-col gap-1 items-start">
                          <input
                            type="checkbox"
                            checked={task.status === "Completed"}
                            onChange={() => changeStatus(task._id, task.status)}
                            className={`checkbox ${
                              task.status === "completed" ? "opasity-50" : ""
                            } checkbox-xs md:checkbox-md `}
                          />
                        </div>
                      </td>
                      <td
                        className={`lg:font-semibold text-lg ${
                          task.status === "Completed" && "opacity-50"
                        } `}
                      >
                        <p>{shortenText(task.taskTitle, 40)}</p>
                        <p className="text-sm font-normal">
                          {task?.taskBody || ""}
                        </p>
                      </td>
                      <td
                        className={`table-cell lg:font-semibold lg:text-lg  ${
                          task.status === "Completed"
                            ? "opacity-100"
                            : "opacity-100"
                        } `}
                      >
                        <span
                          className={`badge ${
                            task.status === "Completed"
                              ? "rounded-md px-3 py-2 text-green-500 border-none bg-[#5dfa6538]"
                              : "px-3 py-2 rounded-md text-purple-500 border-none bg-[#ec0bc72f]"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="text-center">
                        {task?.taskPriority ? (
                          <p
                            className={`py-1 flex items-center justify-center gap-3 font-semibold ${
                              task.taskPriority == "High"
                                ? "text-red-700 bg-[#ec4a4a3b]"
                                : task.taskPriority == "Low"
                                ? "bg-[#1e60db48] text-blue-500"
                                : "text-orange-700 bg-[#ffab2c5b]"
                            }  px-3 rounded-md `}
                          >
                            <GrFlag /> <span>{task?.taskPriority}</span>
                          </p>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="badge border-base-content/20 font-medium">
                          {task?.taskCategory || "-"}
                        </span>
                      </td>
                      <td
                        className={`   font-medium text-[10px] md:text-sm   `}
                      >
                        {task.date}
                      </td>
                      <td className=" table-cell font-medium whitespace-nowrap text-[10px] md:text-sm">
                        {task.taskTime ? (
                          <span className={`flex flex-col `}>
                            <span>{task.taskTime},</span>{" "}
                            <span> {task.taskDate}</span>
                          </span>
                        ) : (
                          "----"
                        )}
                      </td>
                      <td className="text-center ">
                        <div className="flex justify-center items-center w-full  gap-5">
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className=" mt-5 ">
                              <CiMenuKebab className="w-4 h-4 lg:w-5 lg:h-5 " />
                            </div>

                            <ul
                              tabIndex={-1}
                              className="dropdown-content menu bg-base-100 rounded-box z-[100] w-32 p-2 shadow"
                            >
                              {task.status !== "Completed" && (
                                <li>
                                  <button onClick={() => editFunction(task)}>
                                    <GrEdit className="text-warning" /> Edit
                                  </button>
                                </li>
                              )}
                              <li>
                                <button onClick={() => deleteTask(task._id)}>
                                  <IoTrashOutline className="text-warning" />{" "}
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {!collectionData && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          {collectionData?.length === 0 && (
            <div className="w-full h-[400px] flex flex-col items-center justify-center opacity-40">
              <img src={emptyBox} className="w-20 mb-2" alt="Empty" />
              <p className="font-semibold">No tasks yet</p>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      <dialog ref={modalRef} id="my_modal_2" className="modal ">
        <div className="modal-box max-w-sm lg:max-w-md">
          <h3 className="text-lg font-bold text-center mb-4">
            {editingModal ? "Edit task" : "New Task"}
          </h3>
          <Form
            onSubmit={editingModal ? handleSubmit : undefined}
            method="post"
            action={editingModal ? undefined : "."}
            ref={formRef}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col">
              <span>Title</span>
              <input
                required
                name="title"
                defaultValue={editingModal ? editingData.taskTitle : ""}
                type="text"
                className="input input-bordered"
              />
            </label>
            <label className="flex flex-col">
              <span>Date</span>
              <input
                required
                name="date"
                defaultValue={editingModal ? editingData.taskDate : ""}
                type="date"
                className="input input-bordered"
              />
            </label>
            <label className="flex flex-col">
              <span>Due Time</span>
              <input
                name="time"
                defaultValue={editingModal ? editingData.taskTime : ""}
                type="time"
                className="input input-bordered"
              />
            </label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col">
                <span>Category</span>
                <input
                  defaultValue={editingModal ? editingData?.taskCategory : ""}
                  type="text"
                  name="category"
                  className="input input-bordered"
                  placeholder="Enter category"
                />
              </label>
              <div className="flex flex-col w-full ">
                <span>Prioraty</span>
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="input input-bordered flex items-center "
                  >
                    {priority ?? (
                      <span className="text-gray-400">Priority</span>
                    )}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
                  >
                    <li onClick={() => setPriority("High")}>
                      <a className="font-medium">High</a>
                    </li>
                    <li onClick={() => setPriority("Medium")}>
                      <a className="font-medium">Medium</a>
                    </li>
                    <li onClick={() => setPriority("Low")}>
                      <a className="font-medium">Low</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <label className="flex flex-col">
              <span>Task Body</span>
              <textarea
                name="body"
                defaultValue={editingModal ? editingData.taskBody : ""}
                className="textarea textarea-bordered"
              ></textarea>
            </label>
            <input type="hidden" name="userId" value={user.uid} />
            <div className="flex gap-4">
              <button
                disabled={editingModalLoading}
                type="submit"
                className="btn btn-neutral flex-1"
              >
                {editingData ? "Save changes" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingModal(false);
                  setEditingModalLoading(false);
                  modalRef.current?.close();
                  setEditingData(null);
                }}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </dialog>
      {/* ======================== task view modal ======================================= */}
      <dialog id="my_modal_3" className="modal max-w-5xl mx-auto">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-primary">Task</h3>
          <p className="font-semibold text-xl">
            <span className="font-bold text-gray-400">Title:</span>{" "}
            {editingData?.taskTitle}
          </p>
          <p className="">
            <span className="font-bold text-gray-400">Date:</span>{" "}
            {editingData?.taskDate}
          </p>
          <p className="">
            <span className="font-bold text-gray-400">Date:</span>{" "}
            {editingData?.taskTime}
          </p>
          <p className="">
            <span className="font-bold text-gray-400">Date:</span>{" "}
            {editingData?.taskBody}
          </p>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => {
                setEditingData(null);
                document.getElementById("my_modal_3").close();
              }}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      {/* {!collectionData && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {collectionData?.length === 0 && (
        <div className="w-full h-[400px] flex flex-col items-center justify-center opacity-40">
          <img src={emptyBox} className="w-20 mb-2" alt="Empty" />
          <p className="font-semibold">No tasks yet</p>
        </div>
      )} */}
    </div>
  );
}

export default Tasks;
