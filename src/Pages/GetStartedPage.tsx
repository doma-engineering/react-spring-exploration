import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskCategories } from '../Atoms/candidateTableTypes';
import { selectedCategory as selectedCategoryAtom } from '../Atoms/Categories';
import TaskCategoriesGrid from '../Components/TaskCategories/TaskCategoriesGrid';
import { REGISTRATION_URL } from '../routes';

const GetStartedPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] =
        useAtom(selectedCategoryAtom);
    const [needClearSelection, setClearSelection] = useState(true);

    useEffect(() => {
        if (needClearSelection) {
            setClearSelection(false);
            setSelectedCategory(TaskCategories.notSelected);
            return;
        }
        if (selectedCategory !== TaskCategories.notSelected) {
            navigate(REGISTRATION_URL);
            setClearSelection(true);
        }
    }, [selectedCategory]);

    return (
        <div className="flex flex-col items-center text-slate-200 text-5xl space-y-5">
            <p className="pt-12">
                Zhr enables you to <span className="text-teal-500">hire</span>{' '}
                the IT professionals your business needs.
            </p>
            <p className="text-teal-500"> In twenty four hours.</p>
            <p> Competence is guaranteed.</p>
            <p> First hire on us.</p>
            <div className="pt-7">
                <TaskCategoriesGrid />
            </div>
        </div>
    );
};
export default GetStartedPage;
