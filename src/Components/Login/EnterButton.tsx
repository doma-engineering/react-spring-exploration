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
  } // eslint-disable-next-line react-hooks/exhaustive-deps
    , [tryToEnter]);

  const handleClick = () => {
    setTryToEntery(true);
    setEnterStats();
  }

  return (
    <button
      className="btnAccent py-1 px-9"
      onClick={handleClick}
    >
      Enter
    </button>
  );
}

export default EnterButton;