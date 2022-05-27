import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { loginedCompany } from "../../Atoms/Login";
import { HIRINGS_COMPAIGNS_URL } from "../../routes";

const ButtonBackToHiringCompaigns = () => {
  const navigate = useNavigate();
  const [name] = useAtom(loginedCompany);

  return (
    <button
      className="btnAccent"
      onClick={() => navigate(HIRINGS_COMPAIGNS_URL(name))}
    >
      Back to compaigns
    </button>
  );
}

export default ButtonBackToHiringCompaigns;