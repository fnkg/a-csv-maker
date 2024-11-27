"use client"

import { useState, useCallback } from "react";
import {
  AsyncedSelect,
  BasicSelect,
  DatePickerInput,
  NumberInput,
} from "@/src/components";
import {
  formatDateToLocal,
  downloadCsv,
  currencies
} from "@/src/utils/utils"


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
  const [error, setError] = useState(null);

  console.log('OPTIONS', selectOptions)
  const { legalPayers = [], services = [], legalClinics = [], doctors = [], organizations = [] } = selectOptions;

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

  const handleDownload = () => {
    downloadCsv(rows)
  };

  const handleAddRow = () => {
    if (newRow.legal_entity_id === '' || newRow.code === '' || newRow.legal_id === '' || isNaN(newRow.maxAmountToPay)) {
      setError('Пожалуйста, заполните все обязательные поля ✏️');
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
    // Сброс ошибки после успешного добавления
    setError('');
  };

  const handleClearAll = () => {
    setRows([]); // Очистка массива строк
    setNewRow({ // Сброс состояния для новой строки
      legal_entity_id: null,
      contract_id: null,
      code: null,
      legal_id: null,
      user_id: null,
      organization_id: null,
      maxAmountToPay: '',
      currency: 'RUB',
      scheduledOn: '',
    });
    setError(''); // Очистка сообщений об ошибках
  };

  return (
    <div className='p-8'>
      {error && <h3 className='text-red-500 text-xs mb-4 absolute top-7 left-21'>{error}</h3>}

      <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        <BasicSelect
          options={legalPayers || []}
          onChange={(option) => handleSelectChange(option, 'legal_entity_id')}
          value={newRow.legal_entity_id ? { value: newRow.legal_entity_id, label: legalPayers.find(opt => opt.value === newRow.legal_entity_id)?.label } : null}
          placeholder='Плательщик'
        />

        <BasicSelect
          isDisabled={true}
          value={{ value: ',', label: 'contract_id' }}
          placeholder='Contract ID (пустое значение)'
          isSearchable={false}
        />

        <AsyncedSelect
          loadOptions={useCallback(
            (inputValue) =>
              Promise.resolve(
                (services || []).filter((service) =>
                  service.label.toLowerCase().includes(inputValue.toLowerCase())
                )
              ),
            [services]
          )}
          onChange={useCallback((option) => handleSelectChange(option, 'code'), [handleSelectChange])}
          value={
            newRow.code
              ? { value: newRow.code, label: services.find((s) => s.value === newRow.code)?.label }
              : null
          }
          placeholder='Услуга'
          noOptionsMessage={() => 'начните вводить текст ⌨️'}
        />

        <BasicSelect
          options={legalClinics || []}
          onChange={(option) => handleSelectChange(option, 'legal_id')}
          value={newRow.legal_id ? { value: newRow.legal_id, label: legalClinics.find(opt => opt.value === newRow.legal_id)?.label } : null}
          placeholder='Юрлицо клиники'
        />

        <AsyncedSelect
          loadOptions={useCallback(
            (inputValue) =>
              Promise.resolve(
                (doctors || []).filter((doctor) =>
                  doctor.label.toLowerCase().includes(inputValue.toLowerCase())
                )
              ),
            [doctors]
          )}
          onChange={useCallback((option) => handleSelectChange(option, 'user_id'), [handleSelectChange])}
          value={
            newRow.user_id
              ? {
                value: newRow.user_id,
                label: doctors.find((d) => d.value === newRow.user_id)?.label || '',
              }
              : null
          }
          placeholder='Доктор'
          noOptionsMessage={() => 'начните вводить текст ⌨️'}
        />

        <BasicSelect
          options={organizations || []}
          onChange={(option) => handleSelectChange(option, 'organization_id')}
          value={newRow.organization_id ? { value: newRow.organization_id, label: organizations.find(opt => opt.value === newRow.organization_id)?.label } : null}
          placeholder='Клиника'
        />

        <NumberInput
          name='maxAmountToPay'
          value={newRow.maxAmountToPay}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Максимальная сумма к доплате'
          className='number-input'
        />

        <BasicSelect
          options={currencies || []}
          onChange={(currency) => handleSelectChange(currency, 'currency')}
          value={newRow.currency ? { value: newRow.currency, label: newRow.currency } : null}
          placeholder='Валюта'
        />

        <DatePickerInput
          selected={newRow.scheduledOn}
          onChange={handleDateChange}
        />
      </form>

      {/* Кнопки */}
      <div className='flex justify-end mt-8'>
        <button onClick={handleAddRow} className='min-h-[40px] p-[12px] rounded-[12px] text-white bg-[#0354f1] hover:bg-[#1e5dd9]'>Добавить строку</button>
        <button onClick={handleClearAll} className='min-h-[40px] p-[12px] rounded-[12px] text-white bg-red-600 hover:bg-red-700 ml-2'>Очистить всё</button>
        <button onClick={handleDownload} className='min-h-[40px] p-[12px] rounded-[12px] text-white bg-green-600 hover:bg-green-700 ml-2'>Скачать CSV</button>
      </div>

      {/* Отображение всех строк */}
      <h2 className='text-xl font-semibold mt-4 mb-4 text-gray-800'>Текущие строки</h2>
      <div className='overflow-x-auto max-h-[470px] custom-scroll rounded-[12px]'>
        <table className='min-w-full bg-white border-gray-300 border-separate'>
          <thead className='sticky top-0'>
            <tr className='bg-gray-50 text-gray-600 text-sm *:font-normal font-mono'>
              <th className='p-3 border text-left'>Payer Legal ID</th>
              <th className='p-3 border text-left'>Contract ID</th>
              <th className='p-3 border text-left'>Service Code</th>
              <th className='p-3 border text-left'>Clinic Legal ID</th>
              <th className='p-3 border text-left'>User ID</th>
              <th className='p-3 border text-left'>Organization ID</th>
              <th className='p-3 border text-left'>Max Amount</th>
              <th className='p-3 border text-left'>Currency</th>
              <th className='p-3 border text-left'>Scheduled On</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {rows.map((row, index) => (
              <tr key={index} className='hover:bg-gray-100 transition duration-150 text-xs font-mono'>
                <td
                  className='p-3 border'
                  title={legalPayers.find(opt => opt.value === row.legal_entity_id)?.label || row.legal_entity_id}>
                  {row.legal_entity_id}
                </td>

                <td className='p-3 border'>-</td>

                <td
                  className='p-3 border'
                  title={services.find(opt => opt.value === row.code)?.label || row.code}>
                  {row.code}
                </td>

                <td
                  className='p-3 border'
                  title={legalClinics.find(opt => opt.value === row.legal_id)?.label || row.legal_id}>
                  {row.legal_id}
                </td>

                <td
                  className='p-3 border'
                  title={doctors.find(opt => opt.value === row.id)?.label || row.id}>
                  {row.user_id}
                </td>

                <td
                  className='p-3 border'
                  title={organizations.find(opt => opt.value === row.organization_id)?.label || row.organization_id}>
                  {row.organization_id}
                </td>

                <td className='p-3 border'>{row.maxAmountToPay}</td>
                <td className='p-3 border'>{row.currency}</td>
                <td className='p-3 border'>{row.scheduledOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};