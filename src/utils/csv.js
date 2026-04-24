import Papa from 'papaparse';

export function parseCSV(csvString) {
  const { data } = Papa.parse(csvString, { header: true, skipEmptyLines: true });
  return data;
}

export function toCSV(data) {
  return Papa.unparse(data);
}
