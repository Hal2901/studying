import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-1/2  border-4 border-t-main border-r-main border-b-transparent border-l-transparent border-main bg-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
