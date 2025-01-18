"use client"

import { useState } from 'react';
import Form from './Form';
import Table from './Table';
import Buttons from './Buttons';
import ErrorMessage from './ErrorMessage';
import { CsvEditorProps, RowData } from '@/src/utils/types';
import { downloadCsv, formatDateToMoscow } from '@/src/utils/utils';

const CsvEditor: React.FC<CsvEditorProps> = ({ selectOptions }) => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [newRow, setNewRow] = useState<RowData>({
    legal_entity_id: '',
    contract_id: '',
    code: '',
    legal_id: '',
    user_id: '',
    organization_id: '',
    maxAmountToPay: '',
    currency: 'RUB',
    scheduledOn: '',
  });
  const [error, setError] = useState<string | undefined>();
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);

  const handleAddRow = () => {
    if (
      newRow.legal_entity_id === '' ||
      newRow.code === '' ||
      newRow.legal_id === '' ||
      isNaN(Number(newRow.maxAmountToPay)) ||
      !newRow.scheduledOn
    ) {
      setError('Пожалуйста, заполните все обязательные поля ✏️');
      return;
    }

    setRows([
      ...rows,
      {
        ...newRow,
        maxAmountToPay: parseFloat(newRow.maxAmountToPay.toString()) * 100,
        scheduledOn: newRow.scheduledOn
      }
    ]);
    setError('');
  };

  const handleClearAll = () => {
    setRows([]);
    setNewRow({
      legal_entity_id: '',
      contract_id: '',
      code: '',
      legal_id: '',
      user_id: '',
      organization_id: '',
      maxAmountToPay: '',
      currency: 'RUB',
      scheduledOn: '',
    });
    setError('');
  };

  const handleDeleteRow = (index: number) => {
    setDeleteRowIndex(index);
    setTimeout(() => {
      setRows((prevRows) => prevRows.filter((_, i) => i !== index));
      setDeleteRowIndex(null);
    }, 500);
  };

  const handleDownload = () => {
    downloadCsv(rows)
  };

  return (
    <div className='p-8'>
      <ErrorMessage error={error} />

      <Form
        newRow={newRow}
        {...selectOptions}
        handleSelectChange={(option, fieldName) =>
          setNewRow({ ...newRow, [fieldName]: option ? option.value : '' })
        }
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setNewRow({ ...newRow, [name]: value });
        }}
        handleDateChange={(date: Date | null) => {
          const formattedDate = date ? formatDateToMoscow(date) : ""; // Преобразуем дату в московское время
          setNewRow({ ...newRow, scheduledOn: formattedDate }); // Сохраняем строку в стейте
        }}
        handleKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
            e.preventDefault();
          }
        }}
      />

      <Buttons
        onAddRow={handleAddRow}
        onClearAll={handleClearAll}
        onDownload={handleDownload}
      />

      <Table
        rows={rows}
        {...selectOptions}
        deleteRowIndex={deleteRowIndex}
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
};

export default CsvEditor;
