import useGlobalContext from "../hooks/useGlobalContext";
//icons
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoCameraOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
//firebase
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useState } from "react";

//hooks
import { useStorage } from "../hooks/useStorage";
import { Form } from "react-router-dom";

//main function
function Profile() {
  const { user, loading, isDark } = useGlobalContext();
  const [inputValue, setInputValue] = useState(null);
  console.log(user);
  const { UploadUserImage } = useStorage();

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

  return (
    <div className=" md:mt-5 md:rounded-xl overflow-hidden w-full min-h-[80vh] bg-base-100">
      <div
        className={`upper-color w-full h-20  ${
          isDark
            ? "bg-gradient-to-r from-[#789ff3] to-[#faf1de]"
            : "bg-gradient-to-r from-[#4b57fa] to-[#4603ff4f]"
        }`}
      ></div>
      <div className="profile-photo flex items-center justify-between  px-8 pt-8 pb-2">
        <div className="flex items-center gap-8">
          <div className="image relative w-24 h-24 group overflow-hidden rounded-full bg-gray-400">
            <img
              src={inputValue ?? user.photoURL}
              alt=""
              className="object-cover"
            />
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
            <h2 className="font-semibold text-3xl">{user.displayName}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
            {user.phoneNumber && (
              <p className="text-gray-400 text-xs">Tel: {user.phoneNumber}</p>
            )}
          </div>
        </div>
        <div>
          <button className="btn hidden sm:block btn-sm h-10  px-8 text-lg bg-blue-500 hover:bg-blue-600 text-white">
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
          method="post"
          className="grid grid-cols-1 md:grid-cols-2 gap-5 px-10"
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Display name</span>
            <input
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter full name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Phone number</span>
            <input
              type="tel"
              className="input w-full input-bordered"
              placeholder="Enter phone number"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Age</span>
            <input
              type="number"
              className="input w-full input-bordered"
              placeholder="Enter your age"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Country</span>
            <input
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter your country"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Country</span>
            <input
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter your country"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Country</span>
            <input
              type="text"
              className="input w-full input-bordered"
              placeholder="Enter your country"
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
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-gray-400 text-sm">1 month ago</p>
          </div>
        </div>
        <div>
          <button className="btn btn-sm h-9 border-none bg-[#1b7cf318] hover:bg-[#1b7cf32f] text-blue-500 text-[16px] font-normal ">
            Change email adderess
          </button>
        </div>
      </div>
      <div className=" flex hidden items-center gap-5 flex-col sm:flex-row ">
        <div className="w-40 h-40   flex flex-col justify-between items-center">
          <div className="relative">
            <img
              className=" rounded-full object-cover h-28 w-28"
              src={inputValue ?? user.photoURL}
              alt={user.displayName + " profile"}
            />
            {loading && (
              <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <span className="loading loading-spinner text-primary"></span>
              </span>
            )}
          </div>
          {!inputValue && (
            <label>
              <input
                onChange={imageBase64}
                id="input"
                accept="image/*"
                type="file"
                className="file-input file-input-xs file-input-bordered file-input-primary w-full max-w-xs"
              />
            </label>
          )}

          {inputValue && (
            <div className="flex gap-2">
              <button
                onClick={savaNewProfileImage}
                className="btn btn-primary btn-sm"
              >
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

        <div className="bg-base-100 shadow-md w-full grow h-40 p-4 rounded-lg flex flex-col  xl:flex-row justify-evenly">
          <h2 className="flex xl:flex-col md:text-xl gap-1">
            <span className="font-medium">User name: </span> {user.displayName}
          </h2>
          <p className="flex xl:flex-col  md:text-xl gap-1">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="flex items-center gap-2 xl:flex-col   md:text-xl ">
            <span className="font-medium">Verification: </span>{" "}
            {user.emailVerified ? (
              <span className="flex items-center gap-1">
                Verified
                <RiVerifiedBadgeFill />
              </span>
            ) : (
              <div className="flex gap-2 items-center">
                <span>Not verified</span>
                <button
                  onClick={sendVerification}
                  className="btn btn-primary btn-xs"
                  type="button"
                >
                  Verify now
                </button>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
