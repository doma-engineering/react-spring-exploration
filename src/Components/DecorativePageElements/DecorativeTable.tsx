import { useAtomValue } from 'jotai';
import { decorativeTable } from '../../Atoms/DecorativeTable';

const DecorativeTable = () => {
    const tableData = useAtomValue(decorativeTable);

    return (
        <table className="tableDiv">
            <thead>
                <tr className="pb-2 h-14 text-center border-b-2 border-slate-800">
                    {tableData[0]?.map((cell, i) => (
                        <th className="text-center" key={`decTblC0${i}`}>
                            {cell}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.slice(1).map((row, i) => (
                    <tr
                        className="pb-2 h-16 text-center border-b-2 border-slate-800"
                        key={`decTblR${i}`}
                    >
                        {row.map((cell, j) => (
                            <td key={`decTblC${i}:${j}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DecorativeTable;
