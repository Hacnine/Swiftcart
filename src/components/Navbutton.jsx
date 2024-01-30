import React, { useState } from "react";
import NavbarPopup from "./NavbarPopup";
import { MdMenu } from "react-icons/md";
import NavLinks from "./NavLinks";

const Navbutton = () => {
  const [open, setOpen] = useState(false);
  return (
    <main >
      {/* className="App" */}
      <MdMenu className=" text-2xl text-fuchsia-500" onClick={() => setOpen(true)} />

      <NavbarPopup open={open} onClose={() => setOpen(false)}>
        <NavLinks className={"flex-col gap-10 "}/>
      </NavbarPopup>
    </main>
  );
};

export default Navbutton;
