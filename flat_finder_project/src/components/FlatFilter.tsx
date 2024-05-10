import React from "react";

const FlatFilter = () => {
  return (
    <div className="flex justify-center items-center w-[50%] ml-16 px-4 gap-3">
      <div className="flex flex-col text-xs gap-1">
        <label className="font-semibold text-[#F1654D]" htmlFor="city">City: </label>
        <input
          className="border placeholder: h-5 w-28"
          type="text"
          placeholder="City"
        />
      </div>
      <div className="flex flex-col items-center text-xs gap-1">
        <label className="font-semibold text-[#F1654D]" htmlFor="">Rent price range</label>
        <div className="flex gap-2">
          <input className="border placeholder: h-5 w-28" type="text" placeholder="min price" />
          <input className="border placeholder: h-5 w-28" type="text" placeholder="max price" />
        </div>
      </div>
      <div className="flex flex-col items-center text-xs gap-1">
        <label className="font-semibold text-[#F1654D]" htmlFor="">Area size range</label>
        <div className="flex gap-2">
          <input className="border placeholder: h-5 w-28" type="text" placeholder="min area" />
          <input className="border placeholder: h-5 w-28" type="text" placeholder="max area" />
        </div>
      </div>
      <button className="text-[10px] text-center bg-[#F1654D] p-1 rounded-md text-white font-semibold">Filter</button>
    </div>
  );
};

export default FlatFilter;
