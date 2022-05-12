import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginInputString, tryToLogin } from "../../Atoms/Login";

const Login = () => {
  const navigate = useNavigate();
  const [enterTo, setEnterStats] = useAtom(tryToLogin);
  const [logStr, setLogin] = useAtom(loginInputString)
  const [tryToEnter, setTryToEntery] = useState(false);

  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      setEnterStats();
      setTryToEntery(true);
    }
  }

  useEffect(() => {
    if (tryToEnter) {
      setTryToEntery(false);
      navigate(enterTo);
    }
  }
    , [tryToEnter]);

  return (
    <div className="login" style={{ padding: "5px" }}>
      <label>
        Login as:
        <input
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          onKeyDown={checkEnter}
          defaultValue={`${logStr}`}
        />
      </label>
    </div>
  );
}

export default Login;