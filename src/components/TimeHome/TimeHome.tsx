"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Slider from "react-slick";
import HomeHeader from "./components/HomeHeader/HomeHeader";
import CountryData from "./components/CountryData/CountryData";
import { StoreProvider } from "@/redux/StoreProvider";
import Image from "next/image";

const TimeHome = () => {
  const router = useRouter();
  const [country, setCountry] = useState("All");

  const sliderSettings = {
    dots: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrow: true,
    className: "h-full",
  };

  useEffect(() => {
    if (typeof window != undefined) {
      const staylogin = getCookie("keeplogin");
      if (!staylogin) {
        router.push("/login");
      }
    }
  }, []);

  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  const getCountyDetails = (countryType: string) => {
    setCountry(countryType);
  };

  return (
    <div className="max-w-[1320px] w-5/6">
      <HomeHeader tabSelected={(e: string) => getCountyDetails(e)} />
      <StoreProvider>
        <div className="w-full flex flex-col md:flex-row mt-7">
          <div className="border-t-4 border-black w-100 md:w-1/3"></div>
          <div className="uppercase text-5xl font-bold w-100 md:w-1/3 text-center my-3 md:my-0 ">
            WELCOME
          </div>
          <div className="border-b-4 border-black w-100 md:w-1/3"></div>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row gap-5 md:gap-7 my-7">
          <span className="w-100 md:w-2/3 border-2 border-gray-600">
            <Slider {...sliderSettings}>
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Image
                    src={`/file_${i + 1}.jpg`}
                    alt={`alt for file ${i + 1}`}
                    width={1024}
                    height={400}
                    className="slider-image object-cover"
                  />
                </div>
              ))}
            </Slider>
          </span>
          <span className="w-100 md:w-1/3 border-2 border-gray-600">
            <Image
              src="/signin/signin_right.png"
              alt={`alt for signinright`}
              width={1024}
              height={400}
              className="h-[180px] md:h-full object-scale-down"
            />
          </span>
        </div>
        <CountryData tab={country} />
      </StoreProvider>
    </div>
  );
};

export default TimeHome;
