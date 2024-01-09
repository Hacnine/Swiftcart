import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { GoChevronUp } from "react-icons/go";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiMiniChevronUpDown } from "react-icons/hi2";

const sort = [
  { name: "Default" },
  { name: "Price-High to Low" },
  { name: "Price-Low to High" },
  { name: "Name(A-Z)" },
  { name: "Name(Z-A)" },
];

const Sort = ({ setGridView, gridView, products, sortingData }) => {
  const [selected, setSelected] = useState(sort[0]);
  // const setData = () => {
  //   sortingData(selected);
  // };

  useEffect(()=>{
    sortingData(selected);
  }, [selected])

  return (
    <div>
      <div className="flex items-center justify-between   mb-10 px-2">
        <div className="center gap-2">
          <BsGridFill
            className={`${
              gridView
                ? "bg-purple-950 text-purple-400 w-6 h-6 p-1"
                : "text-purple-400"
            } hover:cursor-pointer`}
            onClick={() => setGridView(true)}
          />
          <FaThList
            className={`${
              gridView
                ? "text-purple-400"
                : "bg-purple-950 text-purple-400 w-6 h-6 p-1"
            } hover:cursor-pointer`}
            onClick={() => setGridView(false)}
          />
        </div>

        <div className=" text-gray-600 font-semibold text-sm center gap-1   border-b-2 md:w-40 p-1.5">
          Total <p className=" text-red-400"> {products.length} </p> Products
        </div>

        <div className=" md:w-72 w-[40%]">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-l z-50 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 ">
                  <HiMiniChevronUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                  {sort.map((data, dataIdx) => (
                    <Listbox.Option
                      key={dataIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-purple-100 text-purple-900"
                            : "text-gray-900"
                        }`
                      }
                      value={data}
                      // onClick={setData}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={` block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {data.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                              <GoChevronUp
                                className="h-5 w-5 px-0.5"
                                aria-hidden="true"
                              />

                              {/* <FaChevronDown /> */}
                              {/* <FaChevronUp /> */}
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default Sort;
