import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import PageMappingTable from './Tables/PageMappingTable';
import CMSBlocksTable from './Tables/CMSBlocksTable';
import PHTMLFilesTable from './Tables/PHTMLFilesTable';

function App() {
  return (
    <Provider store={store}>
      <div style={{ padding: '2rem' }}>
        <h1>Magento Data Tables</h1>
        <PageMappingTable />
        <CMSBlocksTable />
        <PHTMLFilesTable />
      </div>
    </Provider>
  );
}

export default App;
