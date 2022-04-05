import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { currentPath, loginedCompany } from "../Atoms/Login";
import { HIRINGS_COMPAIGNS_URL, LOGIN_URL } from "../routes";

const ErrorSwitchModePage = () => {

  const navigate = useNavigate();

  const [nowLogined] = useAtom(loginedCompany)
  const [, setPatch] = useAtom(currentPath);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <span> Sorry but you can't go to <b>switch mode</b> without changes. </span>
      {
        nowLogined !== "" ?
          <button
            onClick={() => {
              setPatch(HIRINGS_COMPAIGNS_URL(nowLogined));
              navigate(HIRINGS_COMPAIGNS_URL(nowLogined));
            }}
          >
            to Hiring compaigns
          </button>
          :
          <button
            onClick={() => {
              setPatch(LOGIN_URL);
              navigate(LOGIN_URL);
            }}
          >
            to Login
          </button>
      }
    </div>
  )
}

export default ErrorSwitchModePage;