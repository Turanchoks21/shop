import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const images = [
  "https://i.ytimg.com/vi/O7FNlIJ020g/maxresdefault.jpg",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/387020/ss_9a3f16b256935e5bb965a9b5a5c9de6a1a36b0c5.1920x1080.jpg?t=1720556608",
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/ss_248c3a1d8583b11933f640af6d99639150a1219b.1920x1080.jpg?t=1720556669",
  "https://static-cdn.jtvnw.net/jtv_user_pictures/c3687ea0-7877-42ca-a38f-49349ecaf20a-profile_banner-480.png",
  "https://www.brawlhalla.com/videos/hero/placeholder.png",
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              data-carousel-item
            >
              <img
                src={image}
                className="block w-auto min-w-full min-h-full transform scale-150"
                alt={`Slide ${index + 1}`}
                style={{
                  transform: "translateY(-20%) scale(1.2)",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse bg-white p-1 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gigabyte-green" : "bg-gray-500"
              }`}
              aria-current={index === currentIndex}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-slate-100 outline-none ring-0">
            <ChevronLeftIcon className="h-8 " />
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-slate-100 outline-none ring-0">
            <ChevronRightIcon className="h-8" />
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}

export default Carousel;
