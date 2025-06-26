import { getLabelFromOptions } from '@/helpers/utils';
import type { TableProps } from './types';

export default function Table({
  fields,
  rows,
  onDeleteRow,
  deleteRowIndex,
  selectOptions,
  isClearing
}: TableProps) {
  return (
    <>
      <h2 className="text-2xl mt-4 mb-4 font-medium text-gray-800">Текущие строки</h2>
      <div className={`overflow-x-auto max-h-[50vh] custom-scroll rounded-[12px] bg-white transition-opacity duration-300 ${isClearing ? 'opacity-0' : 'opacity-100'}`}>

        <table className="w-full bg-white border-gray-300 border-separate table-fixed">
          <thead className="sticky top-0 z-9">
            <tr className="bg-gray-50 text-gray-700 text-sm *:font-bold font-mono">
              {fields.map((f) => (
                <th className="p-2 md:p-3 border-r border-b border-gray-200 text-left w-[140px]" key={f.name}>
                  {f.name}
                </th>
              ))}
              <th
                className="p-2 md:p-3 border-b border-gray-200 text-center w-[80px] text-sm font-semibold"
              >
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 transition duration-150 text-xs font-mono group ${deleteRowIndex === index ? 'delete-row' : ''
                  }`}
              >
                {fields.map((f) => {
                  const key = f.name as keyof typeof row;
                  const rawValue = row[key];
                  const display = getLabelFromOptions(selectOptions, f.name, rawValue, f.optionsKey);

                  return (
                    <td
                      key={f.name}
                      className="p-2 md:p-3 border-r border-b border-gray-100 truncate max-w-[160px]"
                      title={String(rawValue)}
                    >
                      {String(display)}
                    </td>
                  );
                })}
                <td className="p-2 md:p-3 border-b border-gray-100 text-center w-[64px]">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onDeleteRow(index)}
                      className="text-red hover:text-red focus:outline-none"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
