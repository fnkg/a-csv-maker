import Papa from 'papaparse';
import type { IFetchOptions, SelectOption, SelectOptions, DraftRow } from './types';
import { currencies } from './constants';

function byField<T>(fieldName: keyof T): (a: T, b: T) => number {
  return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
}

const fetchData = async <T>(endpoint: string): Promise<T> => {
  const authHeader = `Basic ${btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`)}`;
  const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    },
  } as IFetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server returned an error:', errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const downloadCsv = (rows: object[], filename: string): void => {
  const csv = Papa.unparse(rows, {
    header: false
  });
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`
};

const getSelectValue = (
  key: keyof DraftRow,
  newRow: DraftRow,
  opts: SelectOption[] | undefined,
  multiple?: boolean
): SelectOption | SelectOption[] | null => {
  if (!opts) return multiple ? [] : null;
  if (!multiple) {
    const v = newRow[key] as string | undefined;
    return opts.find((o) => o.value === v) || null;
  }
  const raw = newRow[key];
  return Array.isArray(raw) ? opts.filter((o) => raw.includes(o.value)) : [];
};

const filterOptions = (opts: SelectOption[], input: string) =>
  opts.filter((o) => o.label.toLowerCase().includes(input.toLowerCase()));

const getLabelFromOptions = (
  options: SelectOptions,
  field: string,
  value: string | string[] | undefined,
  optionsKey?: keyof SelectOptions,
): string | string[] => {
  if (!optionsKey || !value) return value ?? '';

  const opts = options[optionsKey] || [];

  if (Array.isArray(value)) {
    return value.map(v => opts.find(opt => opt.value === v)?.label || v).join(', ');
  }

  return opts.find(opt => opt.value === value)?.label || value;
};


export {
  byField,
  currencies,
  downloadCsv,
  fetchData,
  formatDate,
  getSelectValue,
  filterOptions,
  getLabelFromOptions
}
