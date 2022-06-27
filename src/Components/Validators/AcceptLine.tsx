import { useAtom } from 'jotai';
import { filters, urlFilters } from '../../Atoms/Filters';
import { comeChanges } from '../../Atoms/SwithersAtoms';

const AcceptLine = () => {
    const [filter, setFilters] = useAtom(filters);
    const [urlFilter] = useAtom(urlFilters);
    const [, setChanges] = useAtom(comeChanges);

    const pressYes = () => {
        setChanges(false);
        setFilters(urlFilter);
    };

    const pressNo = () => {
        setChanges(false);
        setFilters([...filter]);
    };

    return (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '5rem',
                width: '30rem',
                background: '#101044',
                color: '#EEEEDD',
            }}
        >
            <span>Take new value, change page?</span>
            <button
                style={{ width: '3rem', height: '2rem', margin: '0.5rem' }}
                onClick={pressYes}
            >
                Yes
            </button>
            <button
                style={{ width: '3rem', height: '2rem', margin: '0.5rem' }}
                onClick={pressNo}
            >
                No
            </button>
        </div>
    );
};
export default AcceptLine;
