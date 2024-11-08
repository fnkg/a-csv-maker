'use client'

import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import services from '../data/services.json';
import doctors from '../data/doctors.json';
import payers from '../data/payers.json';
import data from '../data/data.json';


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

  //  объявляем обработчик для Селектов
  //  selectedOption - выбранный объект из Селекта
  //  fieldName - имя поля в массиве newRow, которое обновляем
  const handleSelectChange = (selectedOption, fieldName) => {
    //  обновляем состояние newRow
    //  1. копируем текущее состояние ...newRow
    //  2. динамически обновляем свойство указанное в fieldName, если его нет - пустая строка ''
    setNewRow({ ...newRow, [fieldName]: selectedOption ? selectedOption.value : '' });
  };

  //  объявляем обработчик для Инпутов
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name === 'maxAmountToPay') {
    //   if (value === '' || isNaN(value)) {
    //     setError('Поле должно быть числом.');
    //   } else {
    //     setError('');
    //   }
    // }

    setNewRow({ ...newRow, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewRow({ ...newRow, scheduledOn: date });
  };

  const handleKeyDown = (e) => {
    // Разрешаем ввод только цифр, клавиши управления (Backspace, Delete, Arrow keys)
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  };

  //  добавляем новую строку в таблицу с текущими значениями
  const addRow = () => {
    //  проверяем поля, если ошибка - устанавливаем setError, выходим из функции
    if (newRow.legal_entity_id === '' || newRow.legal_entity_id === null) {
      setError('Пожалуйста, укажите платильщика');
      return;
    }
    if (newRow.code === '' || newRow.code === null) {
      setError('Пожалуйста, укажите услугу');
      return;
    }
    if (newRow.legal_id === '' || newRow.legal_id === null) {
      setError('Пожалуйста, укажите Юрлицо клиники');
      return;
    }
    // if (newRow.user_id === '' || newRow.user_id === null) {
    //   setError('Пожалуйста, укажите доктора');
    //   return;
    // }
    // if (newRow.organization_id === '' || newRow.organization_id === null) {
    //   setError('Пожалуйста, укажите организацию');
    //   return;
    // }
    if (newRow.maxAmountToPay === '' || newRow.maxAmountToPay === null || isNaN(newRow.maxAmountToPay)) {
      setError('Пожалуйста, заполните поле Max Amount to Pay корректно');
      return;
    }
    //  обновляем состояние rows (массив строк таблицы)
    setRows([
      //  копируем существующие строки из текущего состояния rows
      ...rows,
      //  объект newRow добавляется в конец массива с изменением двух полей прайс * 100 и дату берем без времени 
      {
        ...newRow,
        maxAmountToPay: parseFloat(newRow.maxAmountToPay) * 100,
        scheduledOn: newRow.scheduledOn.toISOString().split('T')[0]
      }
    ]);
    //  сбрасываем состояние newRow в начальное значение, очищая все поля и устанавливая дату на new Date()
    // setNewRow({
    //   legal_entity_id: '',
    //   code: '',
    //   legal_id: '',
    //   user_id: '',
    //   organization_id: '',
    //   maxAmountToPay: '',
    //   currency: 'RUB',
    //   scheduledOn: new Date()

    // }, setError(''));
  };

  const downloadCsv = () => {
    const csv = Papa.unparse(rows, {
      header: false // Убираем заголовок из CSV
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'edited_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Мемоизация options для Select
  const payerOptions = useMemo(() => {
    return payers.insuranceCompanies.map(payer => ({
      value: payer.legal_entity_id,
      label: payer.name
    }));
  }, []);

  const serviceOptions = useMemo(() => {
    return services.services.map(service => ({
      value: service.code,
      label: `${service.name} (code: ${service.code})`,
      code: service.code // Добавляем поле code для использования в filterOption
    }));
  }, []);

  const clinicLegalEntityOptions = useMemo(() => {
    return data.clinicLegalEntities.map(entity => ({
      value: entity.legal_id,
      label: entity.name
    }));
  }, []);

  const doctorOptions = useMemo(() => {
    return doctors.doctors.map(doctor => ({
      value: doctor.user_id,
      label: `${doctor.last_name} ${doctor.first_name} ${doctor.patronymic}`
    }));
  }, []);

  const organizationOptions = useMemo(() => {
    return data.organizations.map(org => ({
      value: org.organization_id,
      label: org.name
    }));
  }, []);

  const currencyOptions = useMemo(() => {
    return data.currencies.map(currency => ({
      value: currency,
      label: currency
    }));
  }, []);

  return (
    <div className="p-10 bg-[#f0f1f5]">

      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Редактор CSV</h1>
      {error && <h3 className="text-red-500 text-xs mt-1">{error}</h3>}

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {/* Select для плательщика */}
        <Select
          options={payerOptions}
          onChange={(option) => handleSelectChange(option, 'legal_entity_id')}
          placeholder="Выберите плательщика"
          className={`text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
          isClearable={true}
        />

        {/* Select для Contract ID */}
        <Select
          isDisabled={true} // Блокировка селектора
          value={{ value: ',', label: 'contract_id' }} // Значение по умолчанию, пустая строка
          placeholder="Contract ID (пустое значение)"
          className="text-sm"
          isClearable={false} // Отключаем возможность очистки
          isSearchable={false} // Отключаем поиск, так как значение всегда пустое
        />

        {/* Select для услуги */}
        <Select
          options={serviceOptions}
          onChange={(option) => handleSelectChange(option, 'code')}
          placeholder="Выберите услугу"
          className={`text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
          isClearable={true}
          filterOption={(option, inputValue) => {
            const nameMatch = option.label.toLowerCase().includes(inputValue.toLowerCase());
            const codeMatch = option.data.code.toString().includes(inputValue);
            return nameMatch || codeMatch;
          }}
        />

        {/* Select для юридического лица клиники */}
        <Select
          options={clinicLegalEntityOptions}
          onChange={(option) => handleSelectChange(option, 'legal_id')}
          placeholder="Выберите юридическое лицо клиники"
          className={`text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
          isClearable={true}
        />

        {/* Select для доктора */}
        <Select
          options={doctorOptions}
          onChange={(option) => handleSelectChange(option, 'user_id')}
          placeholder="Выберите доктора"
          className="text-sm"
          isClearable={true}
        />

        {/* Select для организации */}
        <Select
          options={organizationOptions}
          onChange={(option) => handleSelectChange(option, 'organization_id')}
          placeholder="Выберите организацию"
          className="text-sm"
          isClearable={true}
        />

        {/* Поле для ввода числа */}
        <div className="flex flex-col picker">
          <input
            type="number"
            name="maxAmountToPay"
            placeholder="Max Amount to Pay"
            value={newRow.maxAmountToPay}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`p-2 border border-gray-300 rounded-lg w-44 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} w-44`}
          />

        </div>

        {/* Select для выбора валюты */}
        <Select
          options={currencyOptions}
          onChange={(option) => handleSelectChange(option, 'currency')}
          value={{ value: newRow.currency, label: newRow.currency }}
          placeholder="Выберите валюту"
          className="text-sm"
          isClearable={true}
        />

        {/* Поле для выбора даты */}
        <DatePicker
          selected={newRow.scheduledOn}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="p-2 border border-gray-300 rounded-lg w-44 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      <div className="flex  mt-2">
        <button onClick={addRow} className="bg-[#0655ee] text-white p-2 rounded hover:bg-blue-700">
          Добавить строку
        </button>
        <button onClick={downloadCsv} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 ml-2">
          Скачать CSV
        </button>
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
