import Papa from 'papaparse';

interface IFetchOptions {
  method: string;
  headers: Record<string, string>;
}

interface ICurrency {
  value: string;
  label: string;
}

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

const currencies: ICurrency[] = [
  { value: 'RUB', label: 'RUB' },
  { value: 'GEL', label: 'GEL' },
  { value: 'AED', label: 'AED' },
  { value: 'AMD', label: 'AMD' },
];

const downloadCsv = (rows: object[]): void => {
  const csv = Papa.unparse(rows, {
    header: false
  });
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `max-amount.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const formatDateToMoscow = (date: Date): string => {
  const moscowOffset = 3 * 60;
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const moscowDate = new Date(utcDate.getTime() + moscowOffset * 60000);

  const year = moscowDate.getFullYear();
  const month = String(moscowDate.getMonth() + 1).padStart(2, "0");
  const day = String(moscowDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`
};

export {
  byField,
  currencies,
  downloadCsv,
  fetchData,
  formatDateToMoscow,
}
