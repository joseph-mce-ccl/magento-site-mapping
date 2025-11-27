import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCell, addRow, deleteRow } from '../tablesSlice.jsx'; // adjust path

const EditableTable = ({ tableName, columns }) => {
  const storedData = JSON.parse(localStorage.getItem(tableName) || 'null');
  const reduxData = useSelector(state => state.tables[tableName]);
  const dispatch = useDispatch();

  // Local state to manage table data for persistence
  const [data, setData] = useState(storedData || reduxData);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [editRows, setEditRows] = useState({});
  const [draftRow, setDraftRow] = useState(null);
  const [originalRows, setOriginalRows] = useState({}); // store original row values when editing

  useEffect(() => {
    // Whenever data changes, update localStorage
    localStorage.setItem(tableName, JSON.stringify(data));
  }, [data, tableName]);

  const handleSort = (col) => {
    if (sortColumn === col) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortColumn(col);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    return sortOrder === 'asc'
      ? (a[sortColumn] || '').localeCompare(b[sortColumn] || '')
      : (b[sortColumn] || '').localeCompare(a[sortColumn] || '');
  });

  const handleCellChange = (rowIndex, col, value) => {
    const newData = [...data];
    newData[rowIndex][col] = value;
    setData(newData);
  };

  const handleDraftChange = (col, value) => {
    setDraftRow(prev => ({ ...prev, [col]: value }));
  };

  const handleAddDraftRow = () => {
    const emptyRow = Object.fromEntries(columns.map(c => [c, '']));
    setDraftRow(emptyRow);
  };

  const handleSaveDraftRow = () => {
    const newData = [...data, draftRow];
    setData(newData);
    dispatch(addRow({ tableName, row: draftRow }));
    setDraftRow(null);
  };

  const handleCancelDraft = () => {
    setDraftRow(null);
  };

  const handleEditRow = (rowIndex) => {
    setOriginalRows(prev => ({ ...prev, [rowIndex]: { ...data[rowIndex] } }));
    setEditRows(prev => ({ ...prev, [rowIndex]: true }));
  };

  const handleSaveRow = (rowIndex) => {
    setEditRows(prev => ({ ...prev, [rowIndex]: false }));
    delete originalRows[rowIndex];
  };

  const handleCancelEdit = (rowIndex) => {
    const newData = [...data];
    newData[rowIndex] = originalRows[rowIndex];
    setData(newData);
    setEditRows(prev => ({ ...prev, [rowIndex]: false }));
    const updatedOriginals = { ...originalRows };
    delete updatedOriginals[rowIndex];
    setOriginalRows(updatedOriginals);
  };

const handleDeleteRow = (rowIndex) => {
  const confirmed = window.confirm('Are you sure you want to delete this row?');
  if (!confirmed) return;

  const newData = data.filter((_, idx) => idx !== rowIndex);
  setData(newData);
  dispatch(deleteRow({ tableName, index: rowIndex }));
};


  return (
    <div style={{ marginBottom: '2rem' }}>
      <button onClick={handleAddDraftRow} disabled={draftRow !== null}>
        Add Row
      </button>

      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                style={{ cursor: 'pointer', background: sortColumn === col ? '#f0f0f0' : 'white' }}
              >
                {col} {sortColumn === col ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Draft row for new entry */}
          {draftRow && (
            <tr>
              {columns.map(col => (
                <td key={col}>
                  <input
                    type="text"
                    value={draftRow[col]}
                    onChange={e => handleDraftChange(col, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
              ))}
              <td>
                <button onClick={handleSaveDraftRow}>Save</button>
                <button onClick={handleCancelDraft} style={{ marginLeft: '0.5rem' }}>Cancel</button>
              </td>
            </tr>
          )}

          {/* Existing rows */}
          {sortedData.map((row, rowIndex) => {
            const isEditing = editRows[rowIndex] || false;
            return (
              <tr key={rowIndex}>
                {columns.map(col => (
                  <td key={col}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={row[col] || ''}
                        onChange={e => handleCellChange(rowIndex, col, e.target.value)}
                        style={{ width: '100%' }}
                      />
                    ) : (
                      row[col] || ''
                    )}
                  </td>
                ))}
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSaveRow(rowIndex)}>Save</button>
                      <button onClick={() => handleCancelEdit(rowIndex)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
                  )}
                  <button
                    onClick={() => handleDeleteRow(rowIndex)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
