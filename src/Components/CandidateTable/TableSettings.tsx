import Tippy from '@tippyjs/react';
import { useAtomValue, WritableAtom } from 'jotai';
import { MouseEvent, ReactNode, useEffect } from 'react';
import { currentSortFunction } from '../../Atoms/CandidatesSorting';
import { SortFunctionAtom } from '../../Atoms/candidateTableTypes';
import Filter from '../Filters/Filter';

const TableSettings = ({
    header,
    sortingFunction = currentSortFunction,
    filterProps = { disabled: false },
    className,
    clickable = true,
    onClick,
    warning,
}: {
    header?: ReactNode;
    sortingFunction?: WritableAtom<SortFunctionAtom, SortFunctionAtom, void>;
    filterProps?: {
        filter?: WritableAtom<boolean[], boolean[], void>;
        disabled?: boolean;
    };
    className?: string;
    clickable?: boolean;
    onClick?: (
        event?: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => void;
    warning?: string;
}) => {
    const sorting = useAtomValue(sortingFunction);
    const handleClick = (
        event?: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
        if (clickable && onClick) onClick(event);
    };
    return (
        <Tippy
            content={warning}
            className="tippy-error"
            trigger="click"
            onShow={(instance) => {
                setTimeout(() => {
                    instance.hide();
                }, 800);
            }}
            disabled={clickable}
        >
            <div
                className={`flex flex-col items-center ${className}`}
                onClick={handleClick}
            >
                <div className="text-lg text-slate-200 p-2 font-bold">
                    {header}
                </div>
                <Filter {...filterProps} />
                <div className="lblFilter w-40">Sorting settings</div>
                <div className="flex w-full text-base text-slate-200 px-4">
                    Sort by:{' '}
                    <span className="font-bold pl-5 first-letter:uppercase">
                        {sorting.fn}
                    </span>
                </div>
                <div className="flex w-full text-base text-slate-200 px-4 mb-5">
                    Direction:{' '}
                    <span className="font-bold pl-2 first-letter:uppercase">
                        {sorting.isIncrease ? 'increase' : 'decrease'}
                    </span>
                </div>
            </div>
        </Tippy>
    );
};

export default TableSettings;
