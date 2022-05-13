import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { currentPath } from "../../Atoms/Login";
import { LOGIN_URL } from "../../routes";

const ToLoginButton = () => {
  const navigate = useNavigate();
  const [, setPath] = useAtom(currentPath);
  const handleClick = () => {
    setPath(LOGIN_URL);
    navigate(LOGIN_URL);
  }

  return (
    <button
      onClick={handleClick}
    >
      Back to Login
    </button>
  )
}

export default ToLoginButton;