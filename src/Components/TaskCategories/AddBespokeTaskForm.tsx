import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import { CandidateTable } from '../../Atoms/candidateTableTypes';
import { isOpenNewTaskCreating } from '../../Atoms/Categories';

const AddBespokeTaskForm = ({ onCancel }: { onCancel?: () => void }) => {
    const [isOpenAddTask, setIsOpenAddTask] = useAtom(isOpenNewTaskCreating);

    const [taskData, setTaskData] = useState<CandidateTable>();

    const [isOtherCategory, setIsOtherCategory] = useState(false);

    const handleOrder = () => {
        alert('coming soon');
        setIsOpenAddTask(false);
    };

    const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const category = e.currentTarget.value;
        if (category === 'other') {
            setIsOtherCategory(true);
        } else {
            setIsOtherCategory(false);
        }
    };

    return (
        <div
            className="flex flex-col m-2 text-slate-200 bg-slate-700 rounded shadow shadow-slate-900
                          lg:w-[856px] lg:text-xl lg:py-4 lg:px-32"
        >
            <div className="text-2xl p-2 text-center">Create your task!</div>
            <form
                className="flex flex-col mt-8"
                onSubmit={(e) => {
                    console.log(e.currentTarget);
                }}
            >
                <div className="flex justify-between">
                    <label htmlFor="taskName">
                        Enter your task{' '}
                        <span className="text-yellow-400">name</span>:
                    </label>
                    <input type="text" id="taskName" className="w-60 px-3" />
                </div>
                <div className="flex justify-between mt-2">
                    <label htmlFor="category">
                        Select task{' '}
                        <span className="text-yellow-400">technology</span>:{' '}
                    </label>
                    <select
                        name="category"
                        id="category"
                        className="bg-slate-900 w-60 px-2 py-1 ml-2"
                        onChange={handleSelectCategory}
                    >
                        <option value="Java">Java</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Haskell">Haskell</option>
                        <option value="Elixir">Elixir</option>
                        <option value="other">other</option>
                    </select>
                </div>
                {isOtherCategory ? (
                    <div className="flex justify-between mt-2">
                        <label htmlFor="otherCategoryTxt">
                            Write what technology you want:
                        </label>
                        <input
                            type="text"
                            id="otherCategoryTxt"
                            className="px-3 py-1 ml-2 w-60"
                        />
                    </div>
                ) : null}

                <div className="flex justify-between mt-10">
                    <label htmlFor="contactType">
                        What{' '}
                        <span className="text-yellow-400">way contact</span>{' '}
                        with you:
                    </label>
                    <select
                        name="contactType"
                        id="contactType"
                        className="bg-slate-900 w-60 px-2 py-1 ml-2"
                    >
                        <option value="tel">Telephone</option>
                        <option value="email">Email</option>
                    </select>
                </div>
                <div className="flex justify-between mt-2">
                    <label htmlFor="contactInfo">
                        Enter your{' '}
                        <span className="text-yellow-400">contact info</span>:
                    </label>
                    <input type="text" className="w-60 px-3" />
                </div>

                <label htmlFor="txtComment" className="mt-8 mb-2">
                    Enter a comment to give us more information about{' '}
                    <span className="text-yellow-400">what you want</span>:
                </label>
                <textarea
                    className="bg-slate-900 px-2 py-1 text-base"
                    name="task requirement"
                    id="txtComment"
                    cols={30}
                    rows={5}
                    placeholder={`Necessarily:
    - Using postgres.
    - Only back-end.
Desirable:
    - Candidates get more points for a good using logging system. `}
                ></textarea>
            </form>

            <div className="flex justify-between">
                <div className="mt-4">Price range: 8800 - 20000$</div>
                <div>
                    <button
                        className="btnAccent py-1 px-6"
                        onClick={handleOrder}
                    >
                        order
                    </button>
                </div>
            </div>

            <ul className="text-base list-disc pl-5 mt-4 pt-2 border-t-2 border-slate-800">
                <li>
                    At day with you will contact our employee about price and
                    details
                </li>
                <li>
                    We can't give guarantee that we can make test with 'other'
                    technologies
                </li>
            </ul>
            <div className="flex justify-end mt-12">
                <button
                    className="rounded-full border px-6 py-1
                                   hover:bg-slate-600"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddBespokeTaskForm;
