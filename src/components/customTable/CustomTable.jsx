import React from 'react'
import TableSkeleton from '../skeleton/TableSkeleton'

const CustomTable = ({ columns, loading, data }) => {

    return (
        <div className="h-full w-full overflow-y-auto max-h-[550px] border border-gray-400 rounded-md">
            <table className="w-full min-w-max table-auto text-left rounded-md relative">
                <thead className="sticky top-0">
                    <tr>
                        {columns.map(({ header }) => (
                            <th key={header} className="leading-none font-medium text-black text-sm border-b border-gray-400  py-3 px-2 bg-amber-50 border-inherit">{header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading && <TableSkeleton titleLength={columns.length} />}
                    {!loading && data?.length > 0 &&
                        <>
                            {data?.map((row, index) => (
                                <tr key={index} className="border-b border-gray-400 last:border-0">
                                    {columns?.map(({ accessor, render },key) => {
                                        return (
                                            <td className="p-2 text-sm" key={key}>
                                                {render ? render(row) : row[accessor]}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </>
                    }
                    {data?.length == 0 && !loading && <tr><td colSpan={12} className="text-center text-black text-2xl p-5">No Data</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable