import React from "react";
import PersonCard from "./PersonCard";

export default function ChatList() {

  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Banana",
    "Orange",
    "Banana",
    "Orange",
    "Banana",
    "Orange",
    "Banana",
    "Orange",
  ];
// ?kdkjf

  return (
    <main
      className={` relative w-full  h-screen p-5 overflow-hidden  border-r`}
      // style={styles.container}
    >
      <div className="h-screen overflow-y-auto ">




        <div className=" overflow-y-scroll h-[70%] ">
          {items.map((item, index) => (
            <div
              className="w-full"
              
            >
              <PersonCard />
            </div>
          ))}
        </div>
      </div>
      
    </main>
  );
}
