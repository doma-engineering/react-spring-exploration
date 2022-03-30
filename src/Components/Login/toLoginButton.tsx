import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { currentPath } from "../../Atoms/Login";

const ToLoginButton = () => {
  const navigate = useNavigate();
  const [, setPath] = useAtom(currentPath);
  const handleClick = () => {
    setPath("/Login");
    navigate(`/Login`);
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: "relative",
        width: "15rem",
        height: "3rem",
        left: "rem",
      }}
    >
      Back to Login
    </button>
  )
}

export default ToLoginButton;