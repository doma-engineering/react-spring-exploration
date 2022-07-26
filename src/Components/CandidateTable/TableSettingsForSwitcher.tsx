import { currentSavedUrlSortFunction } from '../../Atoms/CandidatesSorting';
import { currentSavedUrlFilters } from '../../Atoms/Filters';
import TableSettings from './TableSettings';

export const OldTableSettings = () => {
    return (
        <TableSettings
            header="Old settings"
            className="bg-slate-700 rounded-lg mr-8 border-4 border-red-800 px-2"
            filterProps={{
                disabled: true,
            }}
            clickable={false}
            warning="You cant change table setting in Switch Mode"
        />
    );
};

export const NewTableSettings = () => {
    return (
        <TableSettings
            header="New settings"
            className="bg-slate-700 rounded-lg ml-8 border-4 border-green-800 px-2"
            sortingFunction={currentSavedUrlSortFunction}
            filterProps={{
                filter: currentSavedUrlFilters,
                disabled: true,
            }}
            clickable={false}
            warning="You cant change table setting in Switch Mode"
        />
    );
};

export default null;
