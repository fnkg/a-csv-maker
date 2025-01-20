import CsvEditor from '@/src/components/CsvEditor';
import { fetchFormattedOptions } from '@/src/helpers/dataFetcher';

export const revalidate = 3600;

export default async function Page() {
  let selectOptions;

  try {
    selectOptions = await fetchFormattedOptions();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return <div>Не удалось загрузить данные 😔</div>;
  }

  return (
    <div className="min-h-full rounded-lg bg-[#f0f1f5]">
      <header className="flex justify-between pt-8 pl-8 pr-8 text-gray-800 font-semibold">
        <h1 className="text-2xl">Редактор CSV</h1>
        <h2 className="text-xl">v0.4.0</h2>
      </header>
      <main>
        <CsvEditor selectOptions={selectOptions} />
      </main>
    </div>
  );
}
