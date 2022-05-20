import { useParams } from "react-router-dom";
import ToLoginButton from "../Components/Login/toLoginButton";

const ErrorPage = () => {
  const { CompanyName } = useParams();
  return (
    <div className="flex justify-center items-center flex-col text-3xl mt-10">
      <div>
        Company <b className="">{CompanyName}</b> haven't registred in ∅HR
      </div>
      <div className="mt-4 text-lg">
        <ToLoginButton text="Go to login" style="btnAccent py-1 px-8 hover:bg-slate-600 hover:text-white" />
      </div>
    </div>
  );
}

export default ErrorPage;