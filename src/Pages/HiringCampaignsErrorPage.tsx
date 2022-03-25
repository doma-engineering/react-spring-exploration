import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { loginInputString } from "../Atoms/Login";
import ToLoginButton from "../Components/Login/toLoginButton";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [name] = useAtom(loginInputString);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>
        Company <span style={{ color: "#000055" }}>{name}</span> haven't registred in ∅HR
      </h1>
      <ToLoginButton />
    </div>
  );
}

export default ErrorPage;