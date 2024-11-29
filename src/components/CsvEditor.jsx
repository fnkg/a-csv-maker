"use client"

import { useState } from 'react';
import Form from './Form';
import Table from './Table';
import Buttons from './Buttons';
import ErrorMessage from './ErrorMessage';
import { downloadCsv, formatDateToLocal } from '@/src/utils/utils';


export default function CsvEditor({ selectOptions }) {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    legal_entity_id: '',
    contract_id: '',
    code: '',
    legal_id: '',
    user_id: '',
    organization_id: '',
    maxAmountToPay: '',
    currency: 'RUB',
    scheduledOn: ''
  });
  const [error, setError] = useState();

  // console.log('OPTIONS', selectOptions)

  const handleAddRow = () => {
    if (
      newRow.legal_entity_id === '' ||
      newRow.code === '' ||
      newRow.legal_id === '' ||
      isNaN(newRow.maxAmountToPay) ||
      newRow.scheduledOn === ''
    ) {
      setError('Пожалуйста, заполните все обязательные поля ✏️');
      return;
    }
    // console.log('DATE CSV', newRow.scheduledOn)
    setRows([
      ...rows,
      {
        ...newRow,
        maxAmountToPay: parseFloat(newRow.maxAmountToPay) * 100,
        scheduledOn: formatDateToLocal(newRow.scheduledOn)
      }
    ]);
    // console.log('DATE CSV AFTER FORMATE', formatDateToLocal(newRow.scheduledOn))
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
        handleDateChange={(date) => setNewRow({ ...newRow, scheduledOn: date })}
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

      <Table rows={rows} {...selectOptions} />
    </div>
  );
};