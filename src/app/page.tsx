import CsvEditor from '@/src/components/CsvEditor';
import NavigationTabs from '@/src/components/NavigationTabs';
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
      <header className="flex justify-between pt-8 pl-8 pr-8 font-medium text-gray-800">
        <h1 className="text-3xl">Редактор CSV</h1>
        <h2 className="text-xl text-gray-300">v0.4.1</h2>
      </header>
      <NavigationTabs />
      <main>
        <CsvEditor selectOptions={selectOptions} />
      </main>
    </div>
  );
}
