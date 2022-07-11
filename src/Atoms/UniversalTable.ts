import { atom } from 'jotai';
import React from 'react';

export type UniversalTable = {
    header?: {
        options?: {
            className?: string;
            onClick?: (
                e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
            ) => void;
        };
        content: (string | number | JSX.Element)[];
    };
    body?: {
        options?: {
            className?: string;
            onClick?: (
                e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
                rowIndex: number
            ) => void;
        };
        content: (string | number | JSX.Element)[][];
    };
};
export const emptyUniversalTable: UniversalTable = {};
export const universalTable = atom<UniversalTable>(emptyUniversalTable);
