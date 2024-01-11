import { useState } from "react";
import Links from "./Links";
import { Button, IconButton } from "@mui/material";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Links />
      {/* <div className="center">
        <Button color="primary">Bismillah</Button>
        <Button color="warning" content="primary" variant='contained' className=" ring-2 ring-purple-500" size="small" startIcon={<FaDeleteLeft/>}>able</Button>
        <IconButton style={{backgroundColor:'green'}}><MdDelete/></IconButton>
      </div> */}
    </>
  );
}

export default App;
