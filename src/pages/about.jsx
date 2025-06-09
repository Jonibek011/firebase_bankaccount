import useGlobalContext from "../hooks/useGlobalContext";

import { useAllCollection } from "../hooks/useAllCollection";
//firebase
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
function about() {
  const { data } = useAllCollection("images");

  const deleteDocFromCollection = async (id) => {
    await deleteDoc(doc(db, "images", id));
  };

  return (
    <div className="h-[100vh] px-[10%]">
      {!data && (
        <div className="w-full h-full  flex justify-center items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
      {data &&
        data.map((todo) => {
          return (
            <div key={todo.id} className="card border mb-5">
              <div className="card-body">
                <h1 className="text-xl font-semibold">{todo.title}</h1>
                <p>{todo.description}</p>
                <div className="flex gap-4">
                  <button className="btn btn-primary self-start">
                    {todo.completed ? "Completed" : "Uncompleted"}
                  </button>
                  <button
                    onClick={() => deleteDocFromCollection(todo.id)}
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default about;
