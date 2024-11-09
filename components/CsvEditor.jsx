'use client'

import React, { useState } from 'react';
import Papa from 'papaparse';
import SelectInput from './SelectInput';
import DatePickerInput from './DatePickerInput';
import NumberInput from './NumberInput';
import { useOptions } from '@/hooks/useOptions';
import services from '@/data/services.json';
import doctors from '@/data/doctors.json';
import payers from '@/data/payers.json';
import data from '@/data/data.json';

const CsvEditor = () => {
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
    scheduledOn: new Date()
  });

  const [error, setError] = useState('');

  const { payerOptions, serviceOptions, clinicLegalEntityOptions, doctorOptions, organizationOptions, currencyOptions } = useOptions(services, payers, doctors, data);

  const handleSelectChange = (selectedOption, fieldName) => {
    setNewRow({ ...newRow, [fieldName]: selectedOption ? selectedOption.value : '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewRow({ ...newRow, scheduledOn: date });
  };

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const formatDateToLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addRow = () => {
    if (newRow.legal_entity_id === '' || newRow.code === '' || newRow.legal_id === '' || isNaN(newRow.maxAmountToPay)) {
      setError('Пожалуйста, заполните все обязательные поля корректно.');
      return;
    }

    setRows([
      ...rows,
      {
        ...newRow,
        maxAmountToPay: parseFloat(newRow.maxAmountToPay) * 100,
        scheduledOn: formatDateToLocal(newRow.scheduledOn)
      }
    ]);
  };

  const downloadCsv = () => {
    const csv = Papa.unparse(rows, { header: false });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'edited_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      {/* Отображение ошибок */}
      {error && <h3 className="text-red-500 text-xs mb-4 absolute top-7 left-21">{error}</h3>}

      {/* Шаблонная форма для заполнения строки */}
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <SelectInput options={payerOptions} onChange={(option) => handleSelectChange(option, 'legal_entity_id')} placeholder="Плательщик" />

        <SelectInput isDisabled={true} value={{ value: ',', label: 'contract_id' }} placeholder="Contract ID (пустое значение)" isSearchable={false} />

        <SelectInput options={serviceOptions} onChange={(option) => handleSelectChange(option, 'code')} placeholder="Услуга" />

        <SelectInput options={clinicLegalEntityOptions} onChange={(option) => handleSelectChange(option, 'legal_id')} placeholder="Юридическое лицо клиники" />

        <SelectInput options={doctorOptions} onChange={(option) => handleSelectChange(option, 'user_id')} placeholder="Доктор" />

        <SelectInput options={organizationOptions} onChange={(option) => handleSelectChange(option, 'organization_id')} placeholder="Клиника" />

        <NumberInput name="maxAmountToPay" value={newRow.maxAmountToPay} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Макс. сумма к оплате" className="p-2 border rounded-[12px] min-h-[40px]" />

        <SelectInput options={currencyOptions} onChange={(option) => handleSelectChange(option, 'currency')} value={{ value: newRow.currency, label: newRow.currency }} placeholder="Выберите валюту" />

        <DatePickerInput selected={newRow.scheduledOn} onChange={handleDateChange} />
      </form>

      {/* Кнопки */}
      <div className="flex justify-end mt-8">
        <button onClick={addRow} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Добавить строку</button>
        <button onClick={downloadCsv} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 ml-2">Скачать CSV</button>
      </div>

      {/* Отображение всех строк */}
      <div className="mt-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Текущие строки</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-base leading-normal">
              <th className="p-3 border text-left">Payer Legal Entity ID</th>
              <th className="p-3 border text-left">Contract ID</th>
              <th className="p-3 border text-left">Service Code</th>
              <th className="p-3 border text-left">Legal ID</th>
              <th className="p-3 border text-left">User ID</th>
              <th className="p-3 border text-left">Organization ID</th>
              <th className="p-3 border text-left">Max Amount</th>
              <th className="p-3 border text-left">Currency</th>
              <th className="p-3 border text-left">Scheduled On</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rows.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition duration-150 text-sm">
                <td className="p-3 border">{row.legal_entity_id}</td>
                <td className="p-3 border">-</td>
                <td className="p-3 border">{row.code}</td>
                <td className="p-3 border">{row.legal_id}</td>
                <td className="p-3 border">{row.user_id}</td>
                <td className="p-3 border">{row.organization_id}</td>
                <td className="p-3 border">{row.maxAmountToPay}</td>
                <td className="p-3 border">{row.currency}</td>
                <td className="p-3 border">{row.scheduledOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvEditor;