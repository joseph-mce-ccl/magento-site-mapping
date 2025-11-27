import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageMapping: [],
  cmsBlocksMapping: [],
  phtmlFiles: [],
};

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      const { tableName, data } = action.payload;
      state[tableName] = data;
    },
    addRow: (state, action) => {
      const { tableName, row } = action.payload;
      state[tableName].push(row);
    },
    deleteRow: (state, action) => {
      const { tableName, index } = action.payload;
      state[tableName].splice(index, 1);
    },
    updateCell: (state, action) => {
      const { tableName, rowIndex, column, value } = action.payload;
      state[tableName][rowIndex][column] = value;
    },
    addColumn: (state, action) => {
      const { tableName, columnName } = action.payload;
      state[tableName].forEach(row => row[columnName] = '');
    },
    deleteColumn: (state, action) => {
      const { tableName, columnName } = action.payload;
      state[tableName].forEach(row => delete row[columnName]);
    },
  },
});

export const { setTableData, addRow, deleteRow, updateCell, addColumn, deleteColumn } = tablesSlice.actions;
export default tablesSlice.reducer;
