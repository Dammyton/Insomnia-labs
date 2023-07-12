import React from "react";

const Spinner = () => {
  return (
    <span className="flex justify-center items-center">
      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
    </span>
  );
};

export default Spinner;
