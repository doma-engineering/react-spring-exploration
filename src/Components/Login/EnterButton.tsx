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
      className="bg-sky-900 shadow rounded-lg text-slate-300 py-1 px-9 hover:bg-slate-600 hover:text-white"
      onClick={handleClick}
    >
      Enter
    </button>
  );
}

export default EnterButton;