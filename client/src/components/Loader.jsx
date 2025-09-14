import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100px]">
      <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
      <p className="ml-4 text-md font-medium">Fetching Movies</p>
    </div>
  );
};

export default Loader;
