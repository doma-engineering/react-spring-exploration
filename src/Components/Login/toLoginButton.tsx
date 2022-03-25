import { useNavigate } from "react-router-dom";

const ToLoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/Login`)}
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