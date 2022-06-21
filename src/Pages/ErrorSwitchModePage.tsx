import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { loggedInCompany } from "../Atoms/Login";
import ButtonBackToHiringCampaigns from "../Components/HiringCampaign/ButtonBackToHiringCampaigns";
import { LOGIN_URL } from "../routes";

const ErrorSwitchModePage = () => {

  const navigate = useNavigate();

  const [company] = useAtom(loggedInCompany)

  return (
    <div className="flex flex-col justify-center items-center text-stone-200 text-4xl">
      <span className="mt-10"> Sorry but you can't go to <b>switch mode</b> without changes. </span>
      {
        company.isLoggedIn ?
          <div className="mt-5">
            <ButtonBackToHiringCampaigns />
          </div>
          :
          <button
            onClick={() => {
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