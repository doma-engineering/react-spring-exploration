import { createLocalStorageAtom } from "./storageHelpsFunctions";

export const usedTables = createLocalStorageAtom<string[]>("usedTables", []);