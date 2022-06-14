import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginInputString, tryToLogin } from "../../Atoms/Login";

const Login = () => {
  const navigate = useNavigate();
  const [enterTo, setEnterStats] = useAtom(tryToLogin);
  const [logStr, setLogin] = useAtom(loginInputString)
  const [tryToEnter, setTryToEntry] = useState(false);

  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      setEnterStats();
      setTryToEntry(true);
    }
  }

  useEffect(() => {
    if (tryToEnter) {
      setTryToEntry(false);
      navigate(enterTo);
    }
  }// eslint-disable-next-line react-hooks/exhaustive-deps  
    , [tryToEnter]);

  return (
    <div className="flex items-center text-stone-200 ">
      <span className="mr-2">Login as:</span>
      <input
        className="bg-slate-900 p-1 px-2"
        type="text"
        onChange={(e) => setLogin(e.target.value)}
        onKeyDown={checkEnter}
        defaultValue={`${logStr}`}
      />
    </div>
  );
}

export default Login;