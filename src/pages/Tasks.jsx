// Tasks.jsx
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Icons & Assets
import { CiMenuKebab } from "react-icons/ci";
import emptyBox from "../assets/images/empty-box.png";

// Context and hooks
import useGlobalContext from "../hooks/useGlobalContext";
import { useAllCollection } from "../hooks/useAllCollection";

// 🔁 Action: Faqat formData ni qaytaradi
export const action = async ({ request }) => {
  const formData = await request.formData();
  const taskTitle = formData.get("title");
  const taskDate = formData.get("date");
  const taskTime = formData.get("due-time");
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

function Tasks() {
  const { user, dispatch } = useGlobalContext();
  const result = useActionData();
  const navigation = useNavigation();
  const modalRef = useRef();
  const formRef = useRef();

  const [sendingData, setSendingData] = useState(false);

  const filter = useMemo(() => ["userId", "==", user.uid], [user.uid]);
  const { data: collectionData } = useAllCollection("Tasks", filter);

  useEffect(() => {
    dispatch({ type: "ADDTASK", payload: collectionData });
  }, [collectionData]);

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
          taskId: uuidv4(),
        };

        try {
          await addDoc(collection(db, "Tasks"), fullData);
          formRef.current?.reset();
          modalRef.current?.close();
        } catch (err) {
          console.error("Firebasega yozishda xatolik:", err);
        } finally {
          setSendingData(false);
        }
      }
    };

    addTaskToFirestore();
  }, [result]);

  return (
    <div className="w-full min-h-[70vh] py-14 px-10 bg-base-100 border relative">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-bold text-blue-700">Tasks.</h2>
        <div className="flex gap-4 items-center">
          <button className="btn btn-sm">All</button>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm m-1">
              Sort by
            </div>
            <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-[1]">
              <li>
                <a>Pending</a>
              </li>
              <li>
                <a>Completed</a>
              </li>
              <li>
                <a>In Progress</a>
              </li>
            </ul>
          </div>
          <button
            onClick={() => modalRef.current?.showModal()}
            className="btn btn-primary btn-sm"
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
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Created</th>
              <th>Due</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collectionData?.map((task) => (
              <tr key={task.taskId}>
                <td>
                  <input type="radio" />
                </td>
                <td>{task.taskTitle}</td>
                <td>{user.displayName}</td>
                <td>{task.date}</td>
                <td>
                  {task.taskTime}, {task.taskDate}
                </td>
                <td>
                  <CiMenuKebab />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-center mb-4">New Task</h3>
          <Form
            method="post"
            action="."
            ref={formRef}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col">
              <span>Title</span>
              <input
                required
                name="title"
                type="text"
                className="input input-bordered"
              />
            </label>
            <label className="flex flex-col">
              <span>Date</span>
              <input
                required
                name="date"
                type="date"
                className="input input-bordered"
              />
            </label>
            <label className="flex flex-col">
              <span>Due Time</span>
              <input
                name="due-time"
                type="time"
                className="input input-bordered"
              />
            </label>
            <label className="flex flex-col">
              <span>Task Body</span>
              <textarea
                name="body"
                className="textarea textarea-bordered"
              ></textarea>
            </label>
            <input type="hidden" name="userId" value={user.uid} />
            <div className="flex gap-4">
              <button type="submit" className="btn btn-neutral flex-1">
                Save
              </button>
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </Form>
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
