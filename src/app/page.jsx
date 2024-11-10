import CsvEditor from '@/src/components/CsvEditor';

export default function Page() {
  return (
    <div className="min-h-full rounded-lg bg-[#f0f1f5]">
      <header className="flex justify-between pt-8 pl-8 pr-8 text-gray-800 font-semibold">
        <h1 className="text-2xl">Редактор CSV</h1>
        <h2 className="text-xl">v0.1.2</h2>
      </header>
      <main>
        <CsvEditor />
      </main>
    </div>
  );
}
