import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { loginedCompany } from "../../Atoms/Login";
import { HIRINGS_COMPAIGNS_URL } from "../../routes";

const ButtonBackToHiringCompaigns = () => {
  const navigate = useNavigate();
  const [name] = useAtom(loginedCompany);

  return (
    <button
      className="bg-sky-900 px-6 py-3  mx-2 my-2 shadow rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white"
      onClick={() => navigate(HIRINGS_COMPAIGNS_URL(name))}
    >
      Back to compaigns
    </button>
  );
}

export default ButtonBackToHiringCompaigns;