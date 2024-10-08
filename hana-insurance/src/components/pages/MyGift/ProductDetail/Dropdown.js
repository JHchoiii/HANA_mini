import React, { useState, useRef, useEffect } from "react";
import "animate.css";

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="w-[800px] m-1 rounded-[20px]">
      <div
        className="flex justify-between items-center p-4 bg-white cursor-pointer pb-2"
        onClick={toggleDropdown}
      >
        <h2
          className={`ml-4 font-bold ${
            isOpen ? "text-[#dc70a7] text-LG" : "text-black text-l"
          }`}
        >
          {title}
        </h2>
        <img
          src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/btn_accordion_down_16px.svg"
          alt="Arrow"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ width: "20px", height: "20px" }}
        />
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
        }}
      >
        <div className="p-4 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
