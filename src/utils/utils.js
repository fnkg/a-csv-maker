import Papa from 'papaparse';

const formatDateToLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  formatDateToLocal,
  downloadCsv
}