import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { useEffect, useState } from "react";

//uuseGlobalState
import useGlobalContext from "../hooks/useGlobalContext";
//action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const taskTitle = formData.get("title");
  const taskDate = formData.get("date");
  const taskTime = formData.get("due-time");
  const taskBody = formData.get("body");

  return { taskTitle, taskDate, taskTime, taskBody };
};

function Tasks() {
  const [taskData, setTaskData] = useState([]);
  const data = useActionData();
  const { user } = useGlobalContext();

  //useEffect
  useEffect(() => {
    if (data?.taskTitle) {
      const form = document.getElementById("form");
      if (form) form.reset();

      const modal = document.getElementById("my_modal_2");
      if (modal?.close) {
        modal.close();
      }
      setTaskData((prev) => {
        return [
          ...prev,
          {
            taskTitle: data.taskTitle,
            taskDate: data.taskDate,
            taskTime: data.taskTime,
            taskBody: data.taskBody,
            userId: user.uid,
          },
        ];
      });
    }
  }, [data]);

  console.log(taskData);

  return (
    <div className="w-full min-h-[70vh] h-auto bg-base-100 py-14 px-10 f">
      <div className="upper-section flex justify-between">
        <h2 className="font-bold text-5xl text-blue-700">Tasks.</h2>
        <div className="flex gap-5 items-center">
          <button className="btn btn-sm ">All</button>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className=" btn btn-sm bg-base-100  m-1"
            >
              Sort by
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
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
          <div>
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="btn btn-primary btn-sm"
            >
              +Add task
            </button>
          </div>
        </div>
      </div>
      <hr />

      <div className="mt-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-xl">Title</th>
                <th className="text-xl">Author</th>
                <th className="text-xl"> Date</th>
                <th className="text-xl">Due data</th>
                <th className="text-xl">Options</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <input type="radio" multiple />
                </th>
                <td>My garder My garder My garder My garder</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>
                  <input type="radio" />
                </th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">New task !</h3>

          <div className="modal-action">
            <Form
              id="form"
              method="post"
              className="w-full flex flex-col gap-4"
            >
              <label className="w-full flex flex-col gap-2">
                {" "}
                <span>Title</span>
                <input
                  required
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full  mx-auto"
                />
              </label>

              <label>
                {" "}
                <span>Date</span>
                <input
                  required
                  type="date"
                  name="date"
                  className="border rounded-md px-4 py-2 ring-transparent outline-none w-full"
                />
              </label>
              <label className="flex flex-col">
                {" "}
                <span>Due time</span>
                <input
                  name="due-time"
                  type="time"
                  className=" border outline-none px-4 py-2 rounded-md self-start"
                />
              </label>

              <label>
                {" "}
                <span>Task body</span>
                <textarea
                  name="body"
                  id="body"
                  className="border outline-none w-full p-5 rounded-md"
                ></textarea>
              </label>
              <div className="flex gap-5">
                <button className="btn btn-neutral flex-1">Save</button>
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_2").close()}
                  className="btn btn-primary flex-1"
                >
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Tasks;
