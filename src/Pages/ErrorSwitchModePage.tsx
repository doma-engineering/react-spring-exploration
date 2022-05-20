import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { currentPath, loginedCompany } from "../Atoms/Login";
import ButtonBackToHiringCompaigns from "../Components/HiringCampaign/ButtonBackToHiringCompaigns";
import { HIRINGS_COMPAIGNS_URL, LOGIN_URL } from "../routes";

const ErrorSwitchModePage = () => {

  const navigate = useNavigate();

  const [nowLogined] = useAtom(loginedCompany)
  const [, setPatch] = useAtom(currentPath);

  return (
    <div className="flex flex-col justify-center items-center text-stone-200 text-4xl">
      <span className="mt-10"> Sorry but you can't go to <b>switch mode</b> without changes. </span>
      {
        nowLogined !== "" ?
          <div className="mt-5">
            <ButtonBackToHiringCompaigns />
          </div>
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