import { useParams } from "react-router-dom";
import ToLoginButton from "../Components/Login/toLoginButton";

const ErrorPage = () => {
  const { CompanyName } = useParams();
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
        Company <span style={{ color: "#000055" }}>{CompanyName}</span> haven't registred in ∅HR
      </h1>
      <ToLoginButton />
    </div>
  );
}

export default ErrorPage;