import React from 'react';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setRows, addRow, editRow, deleteRow } from './features/tennisSlice';
import { parseCSV, toCSV } from './utils/csv';
import ResultsTable from './components/ResultsTable';
import Statistics from './components/Statistics';
import EntryDialog from './components/EntryDialog';
import StatsFilter from './components/StatsFilter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';


function App() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.tennis.rows);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filters, setFilters] = useState({ from: '', to: '', location: '', court: '' });
  // Get unique locations and courts for filter dropdowns
  const locations = Array.from(new Set(rows.map(r => r.location))).filter(Boolean);
  const courts = Array.from(new Set(rows.map(r => r.court))).filter(Boolean);

  // Filtered rows for statistics
  const filteredRows = rows.filter(row => {
    const dateOk = (!filters.from || row.date >= filters.from) && (!filters.to || row.date <= filters.to);
    const locationOk = !filters.location || row.location === filters.location;
    const courtOk = !filters.court || row.court === filters.court;
    return dateOk && locationOk && courtOk;
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleFilterReset = () => {
    setFilters({ from: '', to: '', location: '', court: '' });
  };

  // Load CSV on mount
  useEffect(() => {
    const local = localStorage.getItem('tennis_results');
    if (local) {
      dispatch(setRows(JSON.parse(local)));
    } else {
      fetch(process.env.PUBLIC_URL + '/tennis_results.csv')
        .then((res) => res.text())
        .then((csv) => {
          let data = parseCSV(csv);
          // Ensure all rows have a 'story' field for backward compatibility
          data = data.map(row => ({ ...row, story: row.story || '' }));
          dispatch(setRows(data));
        });
    }
  }, [dispatch]);

  // Persist to localStorage
  useEffect(() => {
    if (rows.length > 0) {
      localStorage.setItem('tennis_results', JSON.stringify(rows));
    }
  }, [rows]);

  const handleAdd = () => {
    setEditIndex(null);
    setDialogOpen(true);
  };
  const handleEdit = (idx) => {
    setEditIndex(idx);
    setDialogOpen(true);
  };
  const handleDelete = (idx) => {
    dispatch(deleteRow(idx));
  };
  const handleDialogSave = (entry) => {
    // Ensure story and set fields exist for backward compatibility
    const fullEntry = {
      ...entry,
      story: entry.story || '',
      set1: entry.set1 || '',
      set2: entry.set2 || '',
      set3: entry.set3 || '',
    };
    if (editIndex === null) {
      dispatch(addRow(fullEntry));
    } else {
      dispatch(editRow({ index: editIndex, row: fullEntry }));
    }
    setDialogOpen(false);
  };
  const handleDialogClose = () => setDialogOpen(false);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleExport = () => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tennis_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import CSV handler
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      let data = parseCSV(event.target.result);
      // Ensure all rows have a 'story' field for backward compatibility
      data = data.map(row => ({ ...row, story: row.story || '' }));
      dispatch(setRows(data));
      localStorage.setItem('tennis_results', JSON.stringify(data));
    };
    reader.readAsText(file);
    // Reset input value so same file can be re-imported if needed
    e.target.value = '';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Tennis Results
        </Typography>
        <StatsFilter
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          locations={locations}
          courts={courts}
        />
        <Statistics rows={filteredRows} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
          <Button variant="outlined" color="secondary" component="label">
            Import CSV
            <input type="file" accept=".csv" hidden onChange={handleImport} />
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleExport}>Export CSV</Button>
        </Box>
        <ResultsTable
          rows={filteredRows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleSort}
        />
        <EntryDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onSave={handleDialogSave}
          initialData={editIndex !== null ? rows[editIndex] : null}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
