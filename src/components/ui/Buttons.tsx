import type { ButtonsProps } from './types';

const Buttons: React.FC<ButtonsProps> = ({ onAddRow, onClearAll, onDownload }) => {
  return (
    <div className="flex justify-end mt-8 font-medium">
      <button onClick={onAddRow} className="btn btn-primary">Добавить строку</button>
      <button onClick={onDownload} className="btn btn-primary ml-2">Скачать CSV</button>
      <button onClick={onClearAll} className="btn btn-clear ml-2">Очистить</button>
    </div>
  );
}

export default Buttons;
