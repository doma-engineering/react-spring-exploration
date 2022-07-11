import { table } from 'console';
import { useAtomValue } from 'jotai';
import { universalTable } from '../../Atoms/UniversalTable';

const UniversalTable = () => {
    const tableData = useAtomValue(universalTable);

    return (
        <div
            className={`tableDiv px-3 ${tableData.header?.options?.className}`}
        >
            <table>
                <thead>
                    <tr
                        className={`pb-2 mx-3 h-14 text-center border-b-2 border-slate-800 ${tableData.header?.options?.className}`}
                    >
                        {tableData.header?.content.map((cell, i) => (
                            <th className="text-center" key={`decTblC0${i}`}>
                                {typeof cell === 'string' ? cell : cell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.body?.content.map((row, i) => (
                        <tr
                            className={`pb-2 h-16 text-center border-b-2 border-slate-800 ${tableData.body?.options?.className}`}
                            key={`decTblR${i}`}
                            onClick={(e) => {
                                if (
                                    tableData.body?.options?.onClick !==
                                    undefined
                                )
                                    tableData.body?.options?.onClick(e, i);
                            }}
                        >
                            {row.map((cell, j) => (
                                <td key={`decTblC${i}:${j}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UniversalTable;
