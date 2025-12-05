import { Form } from "react-router-dom";
// //images
// import uzbFlag from "../assets/images/uzb_flag.png";
// import usaFlag from "../assets/images/usa_flag.jpg";
import { useEffect, useRef, useState } from "react";

//main Function
function Exchange() {
  const [currency, setCurrency] = useState(null);
  const formRef = useRef();
  const firstRef = useRef();
  const [usaCurrency, setUsaCurrency] = useState(true);

  //fetch data

  useEffect(() => {
    const url =
      "https://api.exchangerate.host/live?access_key=599a4093d5b9001f5d656924ebc15674&format=1";

    const getData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();
        setCurrency(data);

        // ✅ Sana bilan birga ma’lumotni ham saqlaymiz
        localStorage.setItem(
          "currencyData",
          JSON.stringify({
            time: Date.now(),
            data,
          })
        );
      } catch (err) {
        console.log("❌ Xatolik:", err.message);
      }
    };

    // 🔍 Avval localStorage'dan o‘qish
    const saved = localStorage.getItem("currencyData");
    if (saved) {
      const parsed = JSON.parse(saved);
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      // ✅ Agar 1 kundan kam vaqt o‘tgan bo‘lsa, saqlangan datani ishlatamiz
      if (now - parsed.time < oneDay) {
        setCurrency(parsed.data);
        return; // yangi so‘rov yubormaymiz
      }
    }

    // ❗ Agar ma’lumot yo‘q yoki 1 kun o‘tgan bo‘lsa, yangi so‘rov yuboramiz
    getData();

    // ✅ Har 1 daqiqada tekshirish
    const intervalId = setInterval(() => {
      const lastRun = saved ? JSON.parse(saved).time : null;
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastRun || now - lastRun > oneDay) {
        getData();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  const changingCurency = () => {
    const first = firstRef.current.value;
    if (!first) {
      formRef.current.secondInput.value = "";
      return;
    }

    if (usaCurrency) {
      formRef.current.secondInput.value = (
        +first * currency.quotes.USDUZS
      ).toFixed(2);
    } else {
      formRef.current.secondInput.value = (
        +first / currency.quotes.USDUZS
      ).toFixed(2);
    }
  };

  const selectChange = (e) => {
    if (e.target.value === "UZS") {
      setUsaCurrency(false);
    } else {
      setUsaCurrency(true);
    }
  };

  return (
    <>
      <div className="flex gap-5  items-center w-full">
        <Form
          ref={formRef}
          className=" flex flex-col sm:flex-row gap-2  md:gap-5 justify-center  items-center w-full"
        >
          <label className="input relative input-sm input-bordered flex flex-row px-2 rounded-md w-full">
            <input
              ref={firstRef}
              onChange={changingCurency}
              type="number"
              step="any"
              className="flex-1 border-none outline-none w-full bg-transparent"
              placeholder={usaCurrency ? "Enter USD" : "Enter UZS"}
              name="firstInput"
            />
            <select
              onChange={selectChange}
              className="max-w-xs bg-base-100 text-base-content text-xs py-2 rounded border-none outline-none"
            >
              <option className="bg-base-100 text-base-content">USD</option>
              <option className="bg-base-100 text-base-content">UZS</option>
            </select>
          </label>

          <label className="input input-sm input-bordered flex flex-row px-2 rounded-md w-full">
            <input
              name="secondInput"
              type="number"
              step="any"
              className="flex-1 border-none outline-none py-2 bg-transparent"
              placeholder={usaCurrency ? "Result for UZS" : "Result for USD"}
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
