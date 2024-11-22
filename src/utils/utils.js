import Papa from 'papaparse';
import { debounce } from 'lodash';

const loadFormattedOptions = (data, labelKeyFormatter, valueKey) => {
  const debouncedLoad = debounce((inputValue, callback) => {
    console.log('Data:', data); // Логирование для проверки вызовов

    const filteredOptions = data
      .filter(item => labelKeyFormatter(item).toLowerCase().includes(inputValue.toLowerCase()))
      .map(item => ({
        value: item[valueKey],
        label: labelKeyFormatter(item),
      }));
    callback(filteredOptions);
  }, 300);

  return debouncedLoad;
};

const formatDoctorLabel = (doctor) => {
  return `${doctor.last_name} ${doctor.first_name} ${doctor.patronymic ? `${doctor.patronymic}` : ''}`;
};

const formatServiceLabel = (service) => {
  const truncatedName = service.name.length > 50 ? `${service.name.substring(0, 100)}...` : service.name;
  return `${truncatedName} (code: ${service.code})`;
};

const formatDateToLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getSelectValue = (options, value) =>
  value ? { value, label: options.find(opt => opt.value === value)?.label || '' } : null;


const downloadCsv = (rows) => {
  const csv = Papa.unparse(rows, {
    header: false
  });
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'edited_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export {
  loadFormattedOptions,
  formatDoctorLabel,
  formatServiceLabel,
  formatDateToLocal,
  getSelectValue,
  downloadCsv
}