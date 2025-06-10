import { Form } from "react-router-dom";
import FormInput from "./FormInput";
//firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
//toast
import toast from "react-hot-toast";

//useActionData
import { useActionData } from "react-router-dom";
import { useEffect } from "react";

//main function
function Modal() {
  const inputData = useActionData();

  //verify
  useEffect(() => {
    if (inputData?.resetPassword) {
      sendPasswordResetEmail(auth, inputData.resetPassword)
        .then(() => {
          toast.success("Verification is sended to your email");
          document.getElementById("my_modal_1").close();
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }, [inputData]);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Reset password</h3>

        <Form method="post">
          <FormInput
            type="email"
            name="email_for_reset"
            placeholder="Enter email"
          />

          <div className="flex justify-end items-center gap-4 mt-4">
            <button className="btn btn-primary">Send</button>
            <button
              onClick={() => document.getElementById("my_modal_1").close()}
              type="button"
              className="btn btn-info"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
}

export default Modal;
