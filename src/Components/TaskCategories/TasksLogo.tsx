import { SiTypescript, SiJava, SiElixir, SiHaskell } from 'react-icons/si';
export const TaskCategoriesLogo: Map<string, string | JSX.Element> = new Map<
    string,
    string | JSX.Element
>([
    ['Java', <SiJava />],
    ['TypeScript', <SiTypescript />],
    ['Haskell', <SiHaskell />],
    ['Elixir', <SiElixir />],
    ['bespoke', ''],
]);

export const TaskCategoriesColors: Map<string, string | JSX.Element> = new Map<
    string,
    string | JSX.Element
>([
    ['Java', 'text-orange-400'],
    ['TypeScript', 'text-sky-600'],
    ['Haskell', 'text-gray-400'],
    ['Elixir', 'text-violet-500'],
    ['bespoke', 'text-yellow-400'],
]);

export default TaskCategoriesLogo;
