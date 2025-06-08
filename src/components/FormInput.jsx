import { FaUserTie } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function FormInput({ type, name, placeholder }) {
  return (
    <>
      <label className="input input-bordered flex items-center gap-2 input-sm md:input-md w-full outline-none">
        <input
          type={type}
          className="grow w-full "
          placeholder={placeholder}
          name={name}
        />
        {name == "search" && <FcSearch className="h-5 w-5" />}
        {name == "userName" && <FaUserTie className="h-5 w-5" />}
        {name == "email" && <MdMarkEmailUnread className="h-5 w-5" />}
        {name == "password" && <RiLockPasswordFill className="h-5 w-5" />}
      </label>
    </>
  );
}

export default FormInput;
