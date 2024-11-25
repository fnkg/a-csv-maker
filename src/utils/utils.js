import Papa from 'papaparse';

const fetchData = async (endpoint) => {
  const authHeader = `Basic ${btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`)}`;
  const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader,
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Логируем HTML
    console.error("Server returned an error:", errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

function byField(fieldName) {
  return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
}

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

const currencies = [
  {
    value: "RUB",
    label: "RUB"
  },
  {
    value: "GEL",
    label: "GEL"
  },
  {
    value: "AED",
    label: "AED"
  },
  {
    value: "AMD",
    label: "AMD"
  }
];

const formatDateToLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export {
  fetchData,
  byField,
  downloadCsv,
  currencies,
  formatDateToLocal
}
