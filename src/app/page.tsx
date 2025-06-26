import CsvEditorShell from '@/components/CsvEditorShell';

import { currencies } from '@/helpers/utils';
import { fetchFormattedOptions } from '@/helpers/dataFetcher';

export const revalidate = 3600;

export default async function Page() {
  let selectOptions;

  try {
    selectOptions = await fetchFormattedOptions();
    selectOptions = {...selectOptions, currencies}
  } catch (e) {
    console.error('Ошибка при загрузке данных:', e);
    return <div>Не удалось загрузить данные 😔</div>;
  }

  return (
    <div className="min-h-full rounded-lg bg-surface">
      <header className="flex justify-between pt-8 pl-8 pr-8 font-medium text-gray-800">
        <h1 className="text-3xl">Редактор CSV</h1>
        <h2 className="text-xl text-gray-300">v0.5.2</h2>
      </header>
      <CsvEditorShell selectOptions={selectOptions} />
    </div>
  );
}
