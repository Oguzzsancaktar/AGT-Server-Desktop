import React from 'react';
import ConnectionBar from 'componets/ConnectionBar';
import Header from 'componets/Header';
import DataTable from 'componets/DataTable';

function DashboardView() {
  return (
    <div>
      <Header />
      <ConnectionBar />
      <div style={{ height: 'calc(100vh - 260px)' }}>
        <DataTable />
      </div>
    </div>
  );
}

export default DashboardView;
