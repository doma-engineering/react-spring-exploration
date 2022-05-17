import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tryToLogin } from "../../Atoms/Login";

const EnterButton = () => {
  const navigate = useNavigate();
  const [tryToEnter, setTryToEntery] = useState(false);
  const [enterTo, setEnterStats] = useAtom(tryToLogin);

  useEffect(() => {
    if (tryToEnter) {
      setTryToEntery(false);
      navigate(enterTo);
    }
  }
    , [tryToEnter]);

  const handleClick = () => {
    setTryToEntery(true);
    setEnterStats();
  }

  return (
    <button
      onClick={handleClick}
      style={{
        fontSize: "18px",
        margin: "1rem"
      }}
    >
      Enter
    </button>
  );
}

export default EnterButton;