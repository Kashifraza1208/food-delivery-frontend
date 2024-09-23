import React from "react";
import { assets } from "../../assets/assets";
import { FadeIn } from "../FadeIn";

const AppDownload = () => {
  return (
    <FadeIn>
      <div
        className="my-24 text-center text-[max(3vw,20px)] font-medium px-6 md:px-12 lg:px-16  max-w-7xl mx-auto"
        id="app-download"
      >
        <p className="text-xl md:text-2xl lg:text-6xl">
          For Better Experience Download <br />
          My Restaurant App
        </p>
        <div className="flex justify-center gap-[max(2vw,10px)] mt-10">
          <img
            src={assets.play_store}
            alt="Play Store"
            className="w-[max(30vw,120px)] max-w-[180px] transition-transform duration-500 cursor-pointer hover:scale-105"
          />
          <img
            src={assets.app_store}
            alt="App Store"
            className="w-[max(30vw,120px)] max-w-[180px] transition-transform duration-500 cursor-pointer hover:scale-105"
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default AppDownload;
