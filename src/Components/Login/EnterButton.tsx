import { useState } from "react";
import TryToEnter from "../Validators/LoginValidator";

const EnterButton = () => {
  const [tryToEnter, setTryToEntery] = useState(false);
  const handleClick = () => {
    setTryToEntery(true);
  }
  return (
    <button
      onClick={handleClick}
      style={{
        position: "relative",
        fontSize: "30px",
        width: "8rem",
        height: "3rem",
      }}
    >
      {tryToEnter ? <TryToEnter /> : "Enter"}
    </button>
  );
}

export default EnterButton;