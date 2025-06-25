import type { ButtonsProps } from './types';

const Buttons: React.FC<ButtonsProps> = ({ onAddRow, onClearAll, onDownload }) => {
  return (
    <div className="flex justify-end mt-8 font-medium">
      <button onClick={onAddRow} className="btn btn-primary">Добавить строку</button>
      <button onClick={onClearAll} className="btn btn-danger ml-2">Очистить всё</button>
      <button onClick={onDownload} className="btn btn-success ml-2">Скачать CSV</button>
    </div>
  );
}

export default Buttons;
