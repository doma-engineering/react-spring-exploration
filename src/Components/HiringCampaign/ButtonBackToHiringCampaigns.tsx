import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { loggedInCompany } from '../../Atoms/Login';
import { HIRING_CAMPAIGNS_URL } from '../../routes';

const ButtonBackToHiringCampaigns = () => {
    const navigate = useNavigate();
    const [name] = useAtom(loggedInCompany);

    return (
        <button
            className="btnAccent"
            onClick={() => navigate(HIRING_CAMPAIGNS_URL(name.companyId))}
        >
            Back to campaigns
        </button>
    );
};

export default ButtonBackToHiringCampaigns;
