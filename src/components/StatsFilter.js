
import React from 'react';
import { Box, TextField, MenuItem, Button, Paper } from '@mui/material';

function StatsFilter({ filters, onChange, onReset, locations = [], courts = [] }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, background: '#f7f3e3', border: '2px solid #d36c2c' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="From"
          type="date"
          name="from"
          value={filters.from}
          onChange={onChange}
          slotProps={{ inputLabel: { shrink: true } }} 
          size="small"
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="To"
          type="date"
          name="to"
          value={filters.to}
          onChange={onChange}
          slotProps={{ inputLabel: { shrink: true } }} 
          size="small"
          sx={{ minWidth: 140 }}
        />
        <TextField
          select
          label="Location"
          name="location"
          value={filters.location}
          onChange={onChange}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>{loc}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Court Type"
          name="court"
          value={filters.court}
          onChange={onChange}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {courts.map((court) => (
            <MenuItem key={court} value={court}>{court}</MenuItem>
          ))}
        </TextField>
        {onReset && (
          <Button variant="outlined" onClick={onReset} sx={{ borderColor: '#d36c2c', color: '#d36c2c', ml: 1 }}>
            Reset
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default StatsFilter;
