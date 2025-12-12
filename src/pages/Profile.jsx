import useGlobalContext from "../hooks/useGlobalContext";
//icons
import { IoCameraOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdVerified } from "react-icons/md";
//firebase
import { sendEmailVerification, updateEmail } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useRef, useState, useEffect } from "react";

//hooks
import { useStorage } from "../hooks/useStorage";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
//firebase

import { doc, updateDoc, onSnapshot } from "firebase/firestore";
//main function
function Profile() {
  const { user: authUser, loading, isDark } = useGlobalContext();
  const [inputValue, setInputValue] = useState(null);
  const [user, setUser] = useState(null);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [emailLoader, setEmailLoader] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const formRef = useRef(null);

  const { UploadUserImage } = useStorage();
  const { register, reset, handleSubmit } = useForm();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const unsub = onSnapshot(doc(db, "Users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });

    return () => unsub();
  }, []);

  const onSubmit = async (data) => {
    const user = auth.currentUser;
    if (!user) return;
    setSubmitLoader(true);
    const userRef = doc(db, "Users", user.uid);
    await updateDoc(userRef, {
      displayName: data.fullName,
      phoneNumber: data.phoneNumber,
      age: data.age,
      country: data.country,
      address: data.address,
      subject: data.subject,
    });
    setSubmitLoader(false);
    reset();
    toast.success("Profile has been updated!");
  };

  const handleExternalSubmit = () => {
    if (formRef.current) formRef.current.requestSubmit();
    console.log("submitted");
  };
  const sendVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success("Verification request has been sent to your email!");
    });
  };

  const imageBase64 = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    if (file.size / 1024 < 1024) {
      reader.addEventListener("load", () => {
        setInputValue(reader.result);
      });
    } else {
      toast.error("Image size should be less than 1MB");
    }
    reader.readAsDataURL(file);
  };

  const savaNewProfileImage = () => {
    UploadUserImage(inputValue);
    setInputValue(null);
  };
  //emailni almashtirish
  const handleEmailChange = async () => {
    try {
      setEmailLoader(true);
      await updateEmail(auth.currentUser, newEmail);
      toast.success("Email changed!");
      document.getElementById("email-change").close();
      setNewEmail("");
    } catch (err) {
      console.log(err.message);
      if (err.code === "auth/requires-recent-login") {
        toast.error("Please log in again to change your email.");
      } else {
        toast.error(err.message);
      }
    } finally {
      setEmailLoader(false);
      document.getElementById("email-change").close();
      setNewEmail("");
    }
  };
  return (
    <div className=" md:mt-5 max-w-[1500px] mx-auto md:rounded-xl overflow-hidden w-full min-h-[80vh] bg-base-100">
      <div
        className={`upper-color w-full h-20  ${
          isDark
            ? "bg-gradient-to-r from-[#789ff3] to-[#faf1de]"
            : "bg-gradient-to-r from-[#4b57fa] to-[#4603ff4f]"
        }`}
      ></div>
      <div className="profile-photo flex items-center justify-between  px-8 pt-8 pb-2">
        <div className="flex items-center gap-8">
          <div className="image relative w-24 h-24 group overflow-hidden rounded-full bg-gray-400 flex justify-center items-center">
            {user?.photoURL && (
              <img
                src={inputValue ?? user?.photoURL}
                alt=""
                className="object-cover"
              />
            )}
            {!user?.photoURL && (
              <span className="loading loading-spinner loading-md"></span>
            )}
            <span
              onClick={() => document.getElementById("input").click()}
              className="absolute bottom-[-100%] group-hover:bottom-0 bg-[#20202096] z-10 w-full h-[40%] flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <IoCameraOutline className="text-white w-5 h-5" />
            </span>
            {loading && (
              <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <span className="loading loading-spinner text-primary"></span>
              </span>
            )}
            {!inputValue && (
              <label>
                <input
                  onChange={imageBase64}
                  id="input"
                  accept="image/*"
                  type="file"
                  className="file-input hidden file-input-xs file-input-bordered file-input-primary w-full max-w-xs"
                />
              </label>
            )}
          </div>
          <div className="name ">
            <h2 className="font-semibold text-3xl flex  items-center gap-2">
              {user?.displayName}{" "}
              {authUser.emailVerified && (
                <span className="text-lg text-blue-500">
                  <MdVerified />
                </span>
              )}
            </h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            {user?.phoneNumber && (
              <p className="text-gray-400 text-xs">Tel: {user?.phoneNumber}</p>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={handleExternalSubmit}
            className="btn hidden sm:block btn-sm h-10  px-8 text-lg bg-blue-500 hover:bg-blue-600 text-white"
            disabled={submitLoader}
          >
            {" "}
            {submitLoader && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Edit
          </button>
        </div>
      </div>
      <div className="h-10 w-full ps-6">
        {inputValue && (
          <div className="flex gap-2">
            <button
              onClick={savaNewProfileImage}
              className="btn btn-primary btn-sm"
            >
              {" "}
              Save
            </button>
            <button
              onClick={() => setInputValue(null)}
              className="btn btn-neutral btn-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <span className="bg-base-content/20 w-full h-[1px] inline-block"></span>
      <div className="">
        <Form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10"
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Display name</span>
            <input
              {...register("fullName", { required: true })}
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter full name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Phone number</span>
            <input
              {...register("phoneNumber", { required: true })}
              type="tel"
              className="input w-full input-bordered"
              placeholder="Enter phone number"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Age</span>
            <input
              {...register("age", { required: true })}
              type="number"
              className="input w-full input-bordered"
              placeholder="Enter your age"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Country</span>
            <input
              {...register("country", { required: true })}
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter your country"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Full address</span>
            <input
              {...register("address", { required: true })}
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter your address"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Profession</span>
            <input
              {...register("subject", { required: true })}
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter your subject"
            />
          </label>
          <div className="flex justify-end sm:hidden">
            <button className="btn btn-sm h-9 px-6 bg-blue-500 hover:bg-blue-600 text-white">
              Edit
            </button>
          </div>
        </Form>
      </div>

      <div className="p-10 flex flex-col gap-5">
        <h2 className="font-semibold text-xl">My email Address</h2>
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-[#1b7cf318] inline-flex justify-center items-center">
            <MdEmail className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium">{authUser?.email}</p>
            <p className="text-gray-400 text-sm">1 month ago</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => document.getElementById("email-change").showModal()}
            className="btn btn-sm h-9 border-none bg-[#1b7cf318] hover:bg-[#1b7cf32f] text-blue-500 text-[16px] font-normal "
          >
            Change email adderess
          </button>
          {authUser.emailVerified !== true && (
            <button
              onClick={sendVerification}
              className="btn btn-secondary btn-sm h-9"
            >
              Verify email
            </button>
          )}
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="email-change" className="modal">
        <div className="modal-box max-w-sm">
          {/* <div className="w-14 h-14 rounded-full bg-[#527ff84b] flex justify-center items-center ">
            <MdAlternateEmail className="w-12 h-12 text-blue-500" />
          </div> */}

          <div className="modal-action">
            <div className="w-full flex flex-col gap-5">
              <label className="felx flex-col gap-1 w-full">
                <span className="">New email</span>
                <input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  type="email"
                  className="w-full border border-base-content/20 h-10 rounded-md shadow-sm px-5"
                  placeholder="Enter your new email"
                />
              </label>
              <div className="flex justify-end items-center gap-5">
                <button
                  className="btn btn-sm btn-primary "
                  onClick={() =>
                    document.getElementById("email-change").close()
                  }
                >
                  Cansel
                </button>
                <button
                  disabled={emailLoader}
                  onClick={handleEmailChange}
                  className="btn btn-sm text-white bg-blue-500 hover:bg-blue-600"
                >
                  {emailLoader ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Profile;
