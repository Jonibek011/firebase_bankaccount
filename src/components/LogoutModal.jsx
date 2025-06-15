import { useLogout } from "../hooks/useLogout";

function LogoutModal() {
  const { signOutUser } = useLogout();
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout !</h3>
          <p className="py-4 ">Do you realy want to logout from this site ?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={signOutUser} className="btn btn-primary btn-sm">
                Logout
              </button>
              <button className="btn btn-info btn-sm">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default LogoutModal;
