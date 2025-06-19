// Tasks.jsx
import { Form, useActionData, useNavigation } from "react-router-dom";
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
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

// Context and hooks
import useGlobalContext from "../hooks/useGlobalContext";
import { useAllCollection } from "../hooks/useAllCollection";

// 🔁 Action: Faqat formData ni qaytaradi
export const action = async ({ request }) => {
  const formData = await request.formData();
  const taskTitle = formData.get("title");
  const taskDate = formData.get("date");
  const taskTime = formData.get("time");
  const taskBody = formData.get("body");
  const userId = formData.get("userId");

  return {
    taskTitle,
    taskDate,
    taskTime,
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

  //task filter
  const [sortCompleted, setSortCompleted] = useState(false);
  const [sortPending, setSortPending] = useState(false);

  const [sendingData, setSendingData] = useState(false);

  const filterData = useMemo(() => ["userId", "==", user.uid], [user.uid]);
  const { data: collectionData } = useAllCollection("Tasks", filterData);

  useEffect(() => {
    dispatch({ type: "ADDTASK", payload: collectionData });
  }, [collectionData]);

  // Firebase ga yozish faqat form submit qilingandan so‘ng
  useEffect(() => {
    setEditingModalLoading(true);
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
          taskId: uuidv4(),
          status: "Pending",
        };

        try {
          await addDoc(collection(db, "Tasks"), fullData);
          formRef.current?.reset();
          modalRef.current?.close();
        } catch (err) {
          console.error("Firebasega yozishda xatolik:", err);
        } finally {
          setSendingData(false);
          setEditingModalLoading(false);
        }
      }
    };

    addTaskToFirestore();
  }, [result]);

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
    const newBody = e.target.body.value;

    const docRef = doc(db, "Tasks", editingData._id);

    await updateDoc(docRef, {
      taskTitle: newTitle,
      taskDate: newDate,
      taskTime: newDueTime,
      taskBody: newBody,
    });

    setEditingData(null);
    setEditingModal(false);
    setEditingModalLoading(false);
    formRef.current.reset();
    modalRef.current.close();
  };

  // tasklarni filter qilish

  const mapData = useMemo(() => {
    if (!collectionData) return [];

    if (sortCompleted) {
      return collectionData.filter((r) => r.status === "Completed");
    }

    if (sortPending) {
      return collectionData.filter((r) => r.status === "Pending");
    }

    return collectionData;
  }, [collectionData, sortCompleted, sortPending]);

  return (
    <div className="w-full min-h-[70vh] py-14 px-10 bg-base-100 border relative">
      <div className="flex justify-end md:justify-between items-center">
        <h2 className="text-5xl font-bold text-blue-700 hidden md:block">
          Tasks.
        </h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              setSortCompleted(false);
              setSortPending(false);
            }}
            className="btn btn-xs md:btn-sm"
          >
            All
          </button>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-xs md:btn-sm m-1"
            >
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
          <button
            onClick={() => modalRef.current?.showModal()}
            className="btn btn-primary btn-xs md:btn-sm"
          >
            + Add task
          </button>
        </div>
      </div>
      <hr className="my-6" />
      <div className="mt-10 relative">
        <table className="table">
          <thead>
            <tr>
              <th className=" max-w-14 shrink  lg:font-bold lg:text-xl  w-14 ">
                Complete
              </th>
              <th className=" lg:text-xl">Title</th>
              <th className=" lg:text-xl hidden md:block">Status</th>
              <th className=" lg:text-xl hidden md:block">Created</th>
              <th className="lg:text-xl hidden md:block">Due Date</th>
              <th className="lg:text-xl">Options</th>
            </tr>
          </thead>
          <tbody>
            {mapData?.map((task) => (
              <tr
                key={task.taskId}
                className={`  ${
                  task.status === "Completed" ? "bg-base-200" : ""
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
                  className={`lg:font-semibold lg:text-xl ${
                    task.status === "Completed" && "line-through opacity-50"
                  } `}
                >
                  {shortenText(task.taskTitle, 25)}
                </td>
                <td
                  className={`hidden md:block lg:font-semibold lg:text-lg  ${
                    task.status === "Completed" ? "opacity-100" : "opacity-50"
                  } `}
                >
                  <span
                    className={`badge ${
                      task.status === "Completed"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td
                  className={`hidden md:block lg:font-semibold lg:text-lg opacity-50 text-[9px] md:text-md   ${
                    task.status === "Completed" && "line-through "
                  }`}
                >
                  {task.date}
                </td>
                <td className="lg:font-semibold lg:text-lg opacity-50 hidden md:block">
                  {task.taskTime ? (
                    <span
                      className={` ${
                        task.status === "Completed" && "line-through "
                      } `}
                    >
                      {task.taskTime}, {task.taskDate}
                    </span>
                  ) : (
                    "----"
                  )}
                </td>
                <td className="inline-flex  items-center  w-full  gap-5">
                  <div>
                    {task.status === "Completed" ? (
                      <span>
                        <IoEyeOffOutline className="w-5 h-5 opacity-50" />
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          document.getElementById("my_modal_3").showModal();
                          setEditingData(task);
                        }}
                      >
                        <MdOutlineRemoveRedEye className="w-3 h-3 md:w-5 md:h-5 opacity-75" />
                      </button>
                    )}
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className=" m-1 ">
                      <CiMenuKebab className="w-5 h-5 lg:w-7 lg:h-7 " />
                    </div>

                    <ul
                      tabIndex={-1}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
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
                          <IoTrashOutline className="text-warning" /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box">
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
  );
}

export default Tasks;
