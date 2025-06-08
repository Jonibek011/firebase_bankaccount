//rrd
import { Form, Link } from "react-router-dom";

import useRegister from "../hooks/useRegister";
//icons
import { FcGoogle } from "react-icons/fc";
function Login() {
  const { LoginWithGoogle } = useRegister();
  return (
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
            <label>
              <span>email</span>
              <input
                type="email"
                className="w-full border border-black rounded-xl px-3 py-2 "
                placeholder="Enter email"
              />
            </label>

            <label>
              password
              <input
                type="password"
                className="w-full border border-black rounded-xl px-3 py-2 "
                placeholder="Enter password"
              />
            </label>
          </div>

          <div className="flex gap-3 md:gap-4 justify-center items-center mt-10 flex-col md:flex-row max-w-96 ">
            <button className="btn grow btn-sm md:btn-md  btn-primary w-full md:w-auto">
              Login
            </button>
            <button
              onClick={LoginWithGoogle}
              type="button"
              className="btn grow btn-sm md:btn-md  btn-info w-full md:w-auto"
            >
              Google <FcGoogle className="w-5 h-5" />
            </button>
          </div>
          <div className="links flex justify-between mt-3 text-white md:text-blue-800 text-sm">
            <Link to="#" className="underline">
              Forgot password ?
            </Link>
            <Link to="/register" className="underline">
              You don't have an account ?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
