import { Form } from "react-router-dom";
//images
import uzbFlag from "../assets/images/uzb_flag.png";
import usaFlag from "../assets/images/usa_flag.jpg";
function Exchange() {
  const url =
    "https://api.exchangerate.host/live?access_key=599a4093d5b9001f5d656924ebc15674";
  return (
    <>
      <div className="flex gap-5  items-center w-full">
        <Form
          className=" flex gap-2  md:gap-5 justify-center  items-center w-full"
          method="post"
        >
          <label className="form-control border flex flex-row px-2 rounded-md w-full">
            <input
              type="number"
              step="any"
              className="flex-1 border-none outline-none w-full"
              placeholder="Enter number"
            />
            <select className=" max-w-xs border-none outline-none ring-0 py-2">
              <option>USD</option>
              <option>UZS</option>
            </select>
          </label>

          <label className="form-control border flex flex-row px-2 rounded-md w-full">
            <input
              type="number"
              step="any"
              className="flex-1 border-none outline-none py-2"
              placeholder="Result UZS"
            />
          </label>
        </Form>
      </div>
      <dialog id="currency_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Currency Converter!</h3>

          <div className="modal-action">
            <Form method="post">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="border py-1 px-2 m-1"
                >
                  USD
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>

              <input
                type="number"
                placeholder="Enter number"
                className="border w-32 py-1 px-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Result"
                className="border w-32 py-1 px-2 rounded-md"
              />
            </Form>
            <button
              className="btn"
              onClick={() => document.getElementById("currency_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Exchange;
