//rrd
import { Form, Link } from "react-router-dom";

import useRegister from "../hooks/useRegister";
//icons
import { FcGoogle } from "react-icons/fc";

//useActionData
import { useActionData } from "react-router-dom";
//components
import { Modal, FormInput } from "../components";

//react
import { useEffect } from "react";

//action
export const action = async ({ request }) => {
  const form = await request.formData();
  let email = form.get("email");
  let password = form.get("password");
  let resetPassword = form.get("email_for_reset");

  if (resetPassword?.trim()) {
    return { resetPassword };
  }

  return { email, password };
};
//main funtion
//===========================================================
function Login() {
  const { LoginWithGoogle, LoginWithEmailAndPassword } = useRegister();
  //actionData
  const formData = useActionData();

  useEffect(() => {
    if (formData?.email && formData?.password) {
      LoginWithEmailAndPassword(formData.email, formData.password);
    }
  }, [formData]);

  return (
    <>
      <Modal />
      <div className="w-full min-h-[100vh] flex ">
        <div className="bg-image md:block hidden w-[40%] bg-[url('https://picsum.photos/600')] bg-center bg-cover"></div>
        <div className="main-info w-full md:w-[60%]  flex justify-center items-center bg-[url('https://picsum.photos/600')] bg-center bg-cover  md:bg-none ">
          <span className="absolute top-0 left-0 w-full h-full inline-block  main-span bg-black bg-opacity-55 md:hidden"></span>
          <Form
            method="post"
            className="register-form max-w-96 w-full  z-10  px-4 md:px-0"
          >
            <h1 className="text-3xl md:text-4xl mb-10 font-semibold text-center text-white md:text-black ">
              Login
            </h1>
            <div className="flex flex-col gap-4 md:gap-7 ">
              <FormInput type="email" name="email" placeholder="Enter email" />

              <FormInput
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <div className="flex gap-3 md:gap-4 justify-center items-center mt-10 flex-col md:flex-row max-w-96 ">
              <button className="btn grow   btn-primary w-full md:w-auto">
                Login
              </button>
              <button
                onClick={LoginWithGoogle}
                type="button"
                className="btn grow   btn-info w-full md:w-auto"
              >
                Google <FcGoogle className="w-5 h-5" />
              </button>
            </div>
            <div className="links flex justify-between mt-3 text-white md:text-blue-800 text-sm">
              <button
                type="button"
                className="underline"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Forgot password?
              </button>
              <Link to="/register" className="underline">
                You don't have an account ?
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
