type ButtonsProps = {
  onAddRow: () => void;
  onClearAll: () => void;
  onDownload: () => void;
};

const Buttons: React.FC<ButtonsProps> = ({ onAddRow, onClearAll, onDownload }) =>  {
  return (
    <div className='flex justify-end mt-8'>
      <button onClick={onAddRow} className='min-h-[40px] p-[12px] rounded-[12px] text-white bg-[#0354f1] hover:bg-[#1e5dd9]'>Добавить строку</button>
      <button onClick={onClearAll} className='min-h-[40px] p-[12px] rounded-[12px] text-white bg-red-600 hover:bg-red-700 ml-2'>Очистить всё</button>
      <button onClick={onDownload} className='min-h-[40px] p-[12px] rounded-[12px] text-white bg-green-600 hover:bg-green-700 ml-2'>Скачать CSV</button>
    </div>
  );
}

export default Buttons;
