import { useAtom } from "jotai";
import { useState } from "react";
import { loginInputString } from "../../Atoms/Login";
import TryToEnter from "../Validators/LoginValidator";

const Login = () => {
  const [logStr, setLogin] = useAtom(loginInputString)
  const [tryToEnter, setTryToEntery] = useState(false);

  const checkEnter = (e: any) => {
    if (e.key === 'Enter') {
      setTryToEntery(true);
    }
  }

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
        {tryToEnter ? <TryToEnter /> : <></>}
      </label>
    </div>
  );
}

export default Login;