import { atom } from 'jotai';

export enum selectedType {
    none = 'none',
    old = 'old',
    new = 'new',
}

export enum candidateSwitchStatus {
    notDisplayed = 'notDisplayed',
    removed = 'removed',
    added = 'added',
    inBoth = 'inBoth',
}

export const switcherMouseHoverTable = atom<selectedType>(selectedType.none);
export const switcherSelectedTable = atom<selectedType>(selectedType.none);

export const comeChanges = atom(false);
