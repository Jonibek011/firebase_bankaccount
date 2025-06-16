import { useEffect, useState } from "react";

//images
import sun from "../assets/images/sun.png";
import cloudSun from "../assets/images/sun (1).png";
import rain from "../assets/images/rain.png";
import cloud from "../assets/images/cloud-computing.png";
import snow from "../assets/images/snow.png";

import { Form } from "react-router-dom";

// actiondata
import { useActionData } from "react-router-dom";
import toast from "react-hot-toast";
const KEY = "05e5eff81ef87654e164b3fcb8eb8238";

function Weather() {
  const [data, setData] = useState(null);

  const cityName = useActionData();

  const API = `https://api.openweathermap.org/data/2.5/weather?q=${
    cityName ? cityName.city : "Tashkent"
  }&units=metric&appid=${KEY}`;

  const getData = async (url) => {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(req.statusText);
      }
      const data = await req.json();
      setData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getData(API);
  }, [API]);

  let image = "";

  if (data && data.weather[0].description === "mist") {
    image = cloud;
  } else if (data && data.weather[0].description == "clear sky") {
    image = sun;
  } else if (data && data.weather[0].description == "cloud") {
    image = cloud;
  } else if (data && data.weather[0].description == "rain") {
    image = rain;
  } else if (data && data.weather[0].description == "snow") {
    image = snow;
  } else if (data && data.weather[0].description == "few clouds") {
    image = cloudSun;
  } else {
    image = sun;
  }

  return (
    <div className="weather-container flex-1 w-40 hidden sm:block ">
      <div className="weather w-[80%] max-w-[80%] h-auto p-10 mx-auto rounded-3xl grid md:grid-cols-1 md:grid-rows-4 lg:grid-cols-2 lg:grid-rows-2  ">
        <div className="">
          <img src={image} alt="image" className="max-w-20 max-h-20 mx-auto" />
        </div>
        <p className="sm:text-3xl md:text-5xl lg:text-5xl text-slate-100  xl:text-6xl font-bold flex justify-center items-center">
          {data && Math.round(data.main.temp)} &deg;C
        </p>
        <p className="flex flex-col justify-center items-center">
          <span className="font-semibold sm:text-2xl md:text-3xl  lg:text-2xl xl:text-3xl text-slate-50">
            {data && data.name}
          </span>

          <span className="font-semibold lg:text-xl xl:text-xl text-slate-50">
            {data && data.weather[0].description}
          </span>
        </p>
        <Form id="form" method="post" className="text-center max-w-full">
          <input
            type="text"
            className="rounded-xl px-3 py-1 w-full"
            placeholder="Enter city name"
            name="cityName"
          />
          <button className="btn mt-3 btn-primary btn-sm">Apply</button>
        </Form>
      </div>
    </div>
  );
}

export default Weather;
