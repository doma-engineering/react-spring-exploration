import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CANDIDATE_TABLE_URL } from '../../routes';

const ButtonShowTask = ({ taskID }: { taskID: string }) => {
    const navigate = useNavigate();
    const hoverClick = () => {
        navigate(CANDIDATE_TABLE_URL(taskID));
    };
    return (
        <button
            onClick={hoverClick}
            className="w-full h-full flex justify-center items-center"
        >
            <div className="btnAccent p-1 md:p-2 lg:hidden">
                <FaEye />
            </div>
            <div className="hidden lg:block lg:btnAccent lg:py-2 lg:px-5">
                Show
            </div>
        </button>
    );
};
export default ButtonShowTask;
