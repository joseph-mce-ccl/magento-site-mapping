import React from 'react';
import EditableTable from './EditableTable';

const PageMappingTable = () => {
  const columns = ['Page Name', 'URL (.com)', 'URL (.eu)', 'Shared or Unique', 'Notes'];
  return <EditableTable tableName="pageMapping" columns={columns} />;
};

export default PageMappingTable;
