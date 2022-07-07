import { atom } from 'jotai';
import { TaskCategories } from './candidateTableTypes';

export const selectedCategory = atom<TaskCategories>(
    TaskCategories.notSelected
);
