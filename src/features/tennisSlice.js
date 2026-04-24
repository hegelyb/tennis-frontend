import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rows: [],
};

const tennisSlice = createSlice({
  name: 'tennis',
  initialState,
  reducers: {
    setRows(state, action) {
      // Ensure set1, set2, set3 fields for backward compatibility
      state.rows = action.payload.map(row => ({
        ...row,
        set1: row.set1 || '',
        set2: row.set2 || '',
        set3: row.set3 || '',
      }));
    },
    addRow(state, action) {
      state.rows.push(action.payload);
    },
    editRow(state, action) {
      const { index, row } = action.payload;
      state.rows[index] = row;
    },
    deleteRow(state, action) {
      state.rows.splice(action.payload, 1);
    },
  },
});

export const { setRows, addRow, editRow, deleteRow } = tennisSlice.actions;
export default tennisSlice.reducer;
