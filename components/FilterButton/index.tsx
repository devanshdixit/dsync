import Image from "next/image";
import { BsSliders } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Button from "../Forms/Button";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Filter = () => {
  const [selectDrop, setSelectDrop] = useState("filter");
  const [input, setInput] = useState("");
  const target = useRef(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleOutsideClick(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelectDrop("filter");
        }
      }
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }
  useOutsideAlerter(target);
  const filterBy = [
    {
      title: "Assignee",
      value: "assignee",
      src: "profile",
    },
    {
      title: "Due date",
      value: "due",
      src: "dueDate",
    },
    {
      title: "Tags",
      value: "tag",
      src: "tag",
    },
  ];
  const assignee = [
    {
      name: "Nishank Sidhpura",
      src: "user",
    },
    {
      name: "Milind Jaiswal",
      src: "user",
    },
    {
      name: "Anuj Rane",
      src: "user",
    },
  ];
  const due = [
    {
      time: "50 min from now",
    },
    {
      time: "1 hr from now",
    },
    {
      time: "4 hr from now",
    },
    {
      time: "12 hr from now",
    },
    {
      time: "Overdue",
    },
  ];
  const tag = [
    {
      tag: "Solidity",
    },
    {
      tag: "Python",
    },
    {
      tag: "Front End",
    },
  ];
  return (
    <div className="2xl:mx-auto ">
      <div ref={target} className=" dropdown text-white  dropdown-end">
        <label tabIndex={0}>
          <BsSliders className="md:hidden" />
          <Button
            title={"Filters"}
            icon={<BsSliders />}
            onClick={() => {
              setSelectDrop("filter");
            }}
            className="hidden md:flex justify-center items-center flex-row-reverse gap-[10px] border-[1px] border-white px-[16px] py-[8px]  font-[600] text-[14px]"
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu active: shadow bg-[#0C0C0E]  p-2"
        >
          <li className="border-b-[1px] border-[#3D3D3D] w-[296px]  ">
            <div className="text-[16px] text-[#858585] font-[400] leading-6 font-Inter py-2 flex justify-between">
              <div className="flex justify-center items-center gap-2">
                <FiSearch className="h-6 w-6 text-[#CECECE]" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  className="w-[170px] bg-transparent placeholder:text-[16px] placeholder:text-[#858585]"
                  placeholder="Filter by..."
                />
              </div>
              <IoCloseSharp
                onClick={() => {
                  setInput("");
                }}
                className="h-6 w-6 "
              />
            </div>
          </li>
          {filterBy &&
            filterBy.map((item: any, i) => {
              if (item.title.toLowerCase().includes(input.toLowerCase())) {
                return (
                  <li key={i} className="flex gap-[17px]">
                    <div
                      onClick={() => {
                        setSelectDrop(`${item.value}`);
                      }}
                      className="text-[12px] font-[400] leading-6 font-Inter pr-[127px] py-2 hover:bg-[#242426] "
                    >
                      <Image
                        src={`/icons/${item.src}.png`}
                        height={20}
                        width={20}
                        alt=""
                        className="w-5 h-5 object-contain"
                      />
                      {item.title}
                    </div>
                  </li>
                );
              }
            })}
        </ul>
        {selectDrop === "assignee" && (
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-[#0C0C0E]  p-2"
          >
            <li className="border-b-[1px] border-[#3D3D3D] w-[296px] ">
              <div className="text-[16px] text-[#858585] font-[400] leading-6 font-Inter py-2 flex justify-between">
                <div className="flex justify-center items-center gap-2">
                  <FiSearch className="h-6 w-6 text-[#CECECE]" />
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    className="w-[170px] bg-transparent placeholder:text-[16px] placeholder:text-[#858585]"
                    placeholder="Assignee..."
                  />
                </div>
                <IoCloseSharp
                  onClick={() => {
                    setInput("");
                  }}
                  className="h-6 w-6"
                />
              </div>
            </li>
            {assignee &&
              assignee.map((item: any, i) => {
                if (item.name.toLowerCase().includes(input.toLowerCase())) {
                  return (
                    <li key={i} className="flex gap-[16px] font-Inter">
                      <label
                        htmlFor={item.name}
                        className="text-[16px] font-[400] leading-6 font-Inter py-2 hover:bg-[#242426] "
                      >
                        <input
                          type="checkbox"
                          className=" accent-[#A9FF1C] h-5 w-5"
                          id={item.name}
                          name={item.name}
                        />
                        <img
                          src={`/icons/${item.src}.png`}
                          className="h-5 w-5"
                          alt="user"
                        />
                        <div>{item.name}</div>
                      </label>
                    </li>
                  );
                }
              })}
          </ul>
        )}
        {selectDrop === "due" && (
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-[#0C0C0E] p-2"
          >
            <li className="border-b-[1px] border-[#3D3D3D] w-[296px] ">
              <div className="text-[16px] text-[#858585] font-[400] leading-6 font-Inter  py-2">
                Due date...
              </div>
            </li>
            {due &&
              due.map((item: any, i) => {
                return (
                  <li key={i} className="flex gap-[16px] font-Inter">
                    <div className="text-[16px] font-[400] leading-6 font-Inter py-2 hover:bg-[#242426] ">
                      <div>{item.time}</div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
        {selectDrop === "tag" && (
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-[#0C0C0E]  p-2"
          >
            <li className="border-b-[1px] border-[#3D3D3D] w-[296px] ">
              <div className="text-[16px] text-[#858585] font-[400] leading-6 font-Inter py-2">
                Tags...
              </div>
            </li>
            {tag &&
              tag.map((item: any, i) => {
                return (
                  <li key={i} className="flex gap-[16px] font-Inter">
                    <label
                      htmlFor={item.tag}
                      className="text-[16px] font-[400] leading-6 font-Inter py-2 hover:bg-[#242426] "
                    >
                      <input
                        type="checkbox"
                        className=" accent-[#A9FF1C] h-5 w-5"
                        id={item.tag}
                        name={item.tag}
                      />
                      <div>{item.tag}</div>
                    </label>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
