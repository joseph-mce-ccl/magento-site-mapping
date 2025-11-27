import React from 'react';
import EditableTable from './EditableTable';

const CMSBlocksTable = () => {
  const columns = ['Block Name', 'Identifier', 'Used On', '.com', '.eu', '.de', 'Shared or Unique', 'Notes'];
  return <EditableTable tableName="cmsBlocksMapping" columns={columns} />;
};

export default CMSBlocksTable;
