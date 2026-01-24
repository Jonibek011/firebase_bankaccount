//react

import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
//hooks
import useRegister from "../hooks/useRegister";
//react-icons
import { FcGoogle } from "react-icons/fc";
import { GiCheckMark } from "react-icons/gi";
import { IoMdHeart } from "react-icons/io";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { useEffect } from "react";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  let displayName = form.get("userName");
  let email = form.get("email");
  let password = form.get("password");
  let confirm_password = form.get("confirm_password");

  if (password === confirm_password) {
    return { displayName, email, password };
  } else {
    console.log("password is not equal");
  }
};
function Register() {
  //useRegister
  const { LoginWithEmail, LoginWithGoogle } = useRegister();
  const forms = useActionData();

  useEffect(() => {
    if (forms) {
      LoginWithEmail(forms.displayName, forms.email, forms.password);
    }
  }, [forms]);
  return (
    <div className="w-full min-h-[100vh]  overflow-y-auto flex ">
      <div className="bg-image relative  hidden  border h-[100vh] w-[50%] bg-[url('https://picsum.photos/600')] bg-center bg-cover  md:flex justify-center items-center">
        <div className="relative z-10  px-[20%] flex flex-col gap-8 ">
          <h2 className="text-white font-bold text-4xl ">
            LifeHub bilan hayotingizni tartibga soling
          </h2>
          <p className="text-white text-lg">
            Vazifalaringizni boshqaring, maqsadlaringizni kuzating va
            hayotingizni yanada samarali qiling.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <span className="w-9 h-9 rounded-full bg-white/30 inline-flex justify-center items-center">
                <GiCheckMark className="text-white" />
              </span>
              <p className="text-white">Kunlik vazifalarni rejalashtirish</p>
            </div>
            <div className="flex gap-3 items-center">
              <span className="w-9 h-9 rounded-full bg-white/30 inline-flex justify-center items-center">
                <GiCheckMark className="text-white" />
              </span>
              <p className="text-white">Maqsadlarni kuzatish</p>
            </div>
            <div className="flex gap-3 items-center">
              <span className="w-9 h-9 rounded-full bg-white/30 inline-flex justify-center items-center">
                <GiCheckMark className="text-white" />
              </span>
              <p className="text-white">Maxfiy va xavfsiz</p>
            </div>
          </div>
        </div>

        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 via-fuchsia-500/90 to-red-400 z-0"></span>
      </div>
      <div className="main-info w-full  md:w-[50%]  flex flex-col gap-5 justify-center items-center bg-white  bg-center bg-cover md:bg-none ">
        <span className="absolute top-0 left-0 w-full h-full inline-block bg-b  bg-opacity-55 main-span md:hidden"></span>
        <div className="text-center flex flex-col  gap-3 justify-center  items-center">
          <div className="rounded-2xl  w-16 h-16 bg-gradient-to-br flex justify-center items-center from-purple-600  to-pink-500 ">
            <IoMdHeart className="text-white w-9 h-9" />
          </div>
          <h2 className="font-bold text-3xl">LifeHub</h2>
          <p className="lg:text-lg text-gray-500">Hayotingizni boshqaring </p>
        </div>
        <Form
          method="post"
          className="register-form max-w-[420px] w-full z-10 px-4 md:px-4 flex flex-col gap-3 "
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl md:text-2xl  font-semibold  text-white md:text-black ">
              Ro'yxatdan o'tish
            </h1>
            <p>Hisob yaratish uchun ma'lumotingizni kiriting</p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 md:gap-4 ">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">To'liq ismingiz</span>
                <FormInput
                  placeholder="Enter your user name"
                  type="text"
                  name="userName"
                  className="text-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Email manzil</span>
                <FormInput placeholder="Your email" type="email" name="email" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Parol</span>
                <FormInput
                  placeholder="Your password"
                  type="password"
                  name="password"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">Parolni tasdiqlang</span>
                <FormInput
                  placeholder="Confirm password"
                  type="password"
                  name="confirm_password"
                />
              </div>

              <button
                type="submit"
                className="btn grow  bg-gradient-to-r from-purple-500/70 to-pink-500/70 text-gray-100 hover:bg-purple-700 w-full md:w-auto"
              >
                Register
              </button>
            </div>
            <div className="h-[1px] bg-gray-400/40 relative">
              <span className="text-sm absolute -top-[18px] left-1/2 -translate-x-1/2 p-2 bg-white ">
                yoki
              </span>
            </div>

            <div className="flex gap-3 md:gap-4 justify-center items-center  flex-col md:flex-row max-w-96 ">
              <button
                onClick={LoginWithGoogle}
                type="button"
                className="btn grow  border border-gray-400/30 bg-transparent w-full md:w-auto"
              >
                <BiLogoFacebookCircle className="w-5 h-5 text-blue-600" />{" "}
                Facebook
              </button>
              <button
                onClick={LoginWithGoogle}
                type="button"
                className="btn grow  border border-gray-400/30 bg-transparent w-full md:w-auto"
              >
                <FcGoogle className="w-5 h-5" /> Google
              </button>
            </div>

            <div className="text-white md:text-blue-900 flex justify-center items-center gap-3 -mt-2 ">
              <span>Hisobingiz bormi</span>
              <Link to="/login" className="underline text-sm ">
                Kirish
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
