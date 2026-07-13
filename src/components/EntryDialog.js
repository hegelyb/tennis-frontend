import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const initialForm = {
  date: '',
  location: '',
  court: 'clay',
  result: '',
  winner: 'Bence',
  set1: '',
  set2: '',
  set3: '',
  story: '',
};


export default function EntryDialog({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({ set1: '', set2: '', set3: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(initialForm);
    setErrors({ set1: '', set2: '', set3: '' });
  }, [initialData, open]);

  const setPattern = /^([0-6])-([0-6])$/;

  const validateSet = (name, value) => {
    if (!value) return '';
    if (!setPattern.test(value)) return 'Format must be [0-6]-[0-6]';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (["set1", "set2", "set3"].includes(name)) {
      setErrors((prev) => ({ ...prev, [name]: validateSet(name, value) }));
    }
  };

  const handleSave = () => {
    const newErrors = {
      set1: validateSet('set1', form.set1),
      set2: validateSet('set2', form.set2),
      set3: validateSet('set3', form.set3),
    };
    setErrors(newErrors);
    if (newErrors.set1 || newErrors.set2 || newErrors.set3) return;
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Edit Entry' : 'Add Entry'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          slotProps={{ inputLabel: { shrink: true } }} 
          variant="filled"
          fullWidth
        />
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Court"
          name="court"
          value={form.court}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="clay">Clay</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>
        <TextField
          select
          label="Winner"
          name="winner"
          value={form.winner}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Bence">Bence</MenuItem>
          <MenuItem value="Berec">Berec</MenuItem>
          <MenuItem value="Draw">Draw</MenuItem>
        </TextField>
        <TextField
          label="1st Set"
          name="set1"
          value={form.set1}
          onChange={handleChange}
          error={!!errors.set1}
          helperText={errors.set1}
          fullWidth
          inputProps={{ inputMode: 'text', pattern: '[0-6]-[0-6]' }}
        />
        <TextField
          label="2nd Set"
          name="set2"
          value={form.set2}
          onChange={handleChange}
          error={!!errors.set2}
          helperText={errors.set2}
          fullWidth
          inputProps={{ inputMode: 'text', pattern: '[0-6]-[0-6]' }}
        />
        <TextField
          label="3rd Set"
          name="set3"
          value={form.set3}
          onChange={handleChange}
          error={!!errors.set3}
          helperText={errors.set3}
          fullWidth
          inputProps={{ inputMode: 'text', pattern: '[0-6]-[0-6]' }}
        />
        <TextField
          label="Story"
          name="story"
          value={form.story}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={10}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
