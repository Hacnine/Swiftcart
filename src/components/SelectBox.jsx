import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { GoChevronUp } from "react-icons/go";
import { HiMiniChevronUpDown } from "react-icons/hi2";

const SelectBox = ({selected, setSelected, sort,}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
    <div className="relative mt-1">
      <Listbox.Button className="relative w-full cursor-default rounded-l z-50 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
        <span className="block truncate capitalize">{selected}</span>
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
                    className={` block truncate capitalize ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {data}
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
  )
}

export default SelectBox
