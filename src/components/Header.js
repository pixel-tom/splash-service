// components/Header.js

import React from "react";
import { useRouter } from "next/router";

const CustomHeader = () => {
  const router = useRouter();

  return (
    <header
      className="px-4 rounded-tl-lg mt-3 bg-[#fefeff] text-[#084b73] border-t border-l border-[#e5e5e5]"
    >
      <div className="flex w-full gap-4 justify-between items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block py-1.5 my-2 ml-10 w-52 lg:w-[400px] md:ml-0 bg-[#f5f5f5] text-[#084b73] border border-[#0fa7de] rounded-full pl-10"
          />
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
