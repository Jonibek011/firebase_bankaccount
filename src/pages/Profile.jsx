import useGlobalContext from "../hooks/useGlobalContext";
//icons
import { RiVerifiedBadgeFill } from "react-icons/ri";
//firebase
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
function Profile() {
  const { user } = useGlobalContext();
  console.log(user);

  const sendVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      toast.success("Verification sended!");
    });
  };

  return (
    <div className="px-[10%] pt-[5%]">
      <div className="flex items-center gap-5 ">
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <img src={user.photoURL} alt={user.displayName + " profile"} />
        </div>
        <div className="bg-base-200 grow h-40 p-4 rounded-lg flex flex-col md:flex-row md:justify-evenly">
          <h2 className="flex md:flex-col text-xl">
            <span className="font-medium">User name:</span> {user.displayName}
          </h2>
          <p className="flex md:flex-col  text-xl">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="flex items-center gap-2 md:flex-col  text-xl">
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
