import { useTranslation } from "react-i18next";
import USA from "../../assets/images/tasks/USA_flag.png";
import UZ from "../../assets/images/tasks/flag-uzbekistan-circle-logo-icon-260nw-2647020205-removebg-preview.png";
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="flex gap-2">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm btn-ghost flex gap-1 px-1 items-center"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden">
            <img src={USA} className="h-full object-cover border" alt="" />
          </div>
          <span>Eng</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1]  p-2 shadow"
        >
          <li onClick={() => changeLang("uz")}>
            <div className="flex gap-1 items-center">
              <div className="w-6 h-6  rounded-full overflow-hidden">
                <img src={UZ} className="h-full  object-fill border" alt="" />
              </div>
              <a>UZ</a>
            </div>
          </li>
          <li onClick={() => changeLang("en")}>
            <div className="flex gap-1 items-center">
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <img src={USA} className="h-full object-cover border" alt="" />
              </div>
              <a>EN</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
