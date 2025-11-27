import React from 'react';
import EditableTable from './EditableTable';

const PHTMLFilesTable = () => {
  const columns = ['PHTML File Block Name', 'Identifier', 'Used On', '.com', '.eu', '.de', 'Shared or Unique', 'Notes'];
  return <EditableTable tableName="phtmlFiles" columns={columns} />;
};

export default PHTMLFilesTable;
