import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { currentPath } from "../../Atoms/Login";
import { LOGIN_URL } from "../../routes";

type buttonParameters = {
  text: string;
  style: string;
}

const ToLoginButton: React.FC<buttonParameters> = ({ text, style }) => {
  const navigate = useNavigate();
  const [, setPath] = useAtom(currentPath);
  const handleClick = () => {
    setPath(LOGIN_URL);
    navigate(LOGIN_URL);
  }

  return (
    <button
      className={style}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default ToLoginButton;