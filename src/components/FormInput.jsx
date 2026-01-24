import { FaUserTie } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function FormInput({ type, name, placeholder }) {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2  md:input-md w-full outline-none bg-gray-200/30">
        {name == "search" && <FcSearch className="h-5 w-5 " />}
        {name == "userName" && <FaUserTie className="h-5 w-5 text-gray-400" />}
        {name == "email" && (
          <MdMarkEmailUnread className="h-5 w-5 text-gray-400" />
        )}
        {name == "password" && (
          <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
        )}
        {name == "confirm_password" && (
          <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
        )}
        <input
          type={type}
          className="grow w-full  "
          placeholder={placeholder}
          name={name}
        />
      </label>
    </>
  );
}

export default FormInput;
