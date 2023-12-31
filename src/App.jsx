import { useState } from "react";
import Links from "./Links";
import { AppProvider } from "./context/ProductContex";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Links />
    </>
  );
}

export default App;
