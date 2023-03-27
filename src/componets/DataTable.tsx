import React, { useLayoutEffect } from 'react';
import { Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Icons from 'constants/icons';

const data = [
  {
    key: '1',
    machine: 'Machine A',
    customElements: <div>Some custom elements for Machine A</div>,
  },
  {
    key: '2',
    machine: 'Machine B',
    customElements: <div>Some custom elements for Machine B</div>,
  },
  {
    key: '3',
    machine: 'Machine C',
    customElements: <div>Some custom elements for Machine C</div>,
  },
  {
    key: '4',
    machine: 'Machine D',
    customElements: <div>Some custom elements for Machine D</div>,
  },
  {
    key: '5',
    machine: 'Machine E',
    customElements: <div>Some custom elements for Machine E</div>,
  },
  {
    key: '6',
    machine: 'Machine F',
    customElements: <div>Some custom elements for Machine F</div>,
  },
  {
    key: '7',
    machine: 'Machine G',
    customElements: <div>Some custom elements for Machine G</div>,
  },
  {
    key: '8',
    machine: 'Machine H',
    customElements: <div>Some custom elements for Machine H</div>,
  },
  {
    key: '9',
    machine: 'Machine I',
    customElements: <div>Some custom elements for Machine I</div>,
  },
  {
    key: '10',
    machine: 'Machine J',
    customElements: <div>Some custom elements for Machine J</div>,
  },
  {
    key: '11',
    machine: 'Machine K',
    customElements: <div>Some custom elements for Machine K</div>,
  },
  {
    key: '12',
    machine: 'Machine L',
    customElements: <div>Some custom elements for Machine L</div>,
  },
  {
    key: '13',
    machine: 'Machine M',
    customElements: <div>Some custom elements for Machine M</div>,
  },
  {
    key: '14',
    machine: 'Machine N',
    customElements: <div>Some custom elements for Machine N</div>,
  },
];

// Define the columns for the table
const columns: ColumnsType<{
  key: string;
  machine: string;
  dataInformation: React.ReactElement;
  cloudConnection: React.ReactElement;
  customElements: React.ReactElement;
}> = [
  {
    title: 'Machine',
    dataIndex: 'machine',
    key: 'machine',
  },
  {
    title: 'Data Information',
    dataIndex: 'dataInformation',
    key: 'dataInformation',
    width: '200px',
    align: 'center',
  },
  {
    title: 'Cloud Connection',
    dataIndex: 'cloudConnection',
    key: 'cloudConnection',
    width: '200px',
    align: 'center',
  },
];

// Define a function to render the collapsable row
const renderCollapsableRow = (record: any) => {
  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <img
          src={isActive ? Icons.cloudBlueIcon : Icons.cloudGreenIcon}
          alt="expand"
        />
      )}
    >
      {record.customElements}
    </Collapse>
  );
};

// Define a function to render the table component
function DataTable() {
  const tableRef = React.useRef(null);
  const [height, setHeight] = React.useState(500);

  useLayoutEffect(() => {
    if (tableRef?.current && tableRef?.current?.clientHeight) {
      setHeight(tableRef?.current.clientHeight - 55 - 60 || 500);
    }
  }, []);
  return (
    <div
      ref={tableRef}
      className="wrapper h-full bg-white "
      style={{ paddingTop: '30px', paddingBottom: '30px' }}
    >
      <div className="bordered border-darkBlue">
        <Table
          className="container h-full rounded"
          columns={columns}
          dataSource={data.map((d) => {
            return {
              ...d,
              dataInformation: <img src={Icons.infoIcon} alt="expand" />,
              cloudConnection: <img src={Icons.cloudGrayIcon} alt="expand" />,
            };
          })}
          rowClassName="cursor-pointer"
          pagination={false}
          scroll={{ y: height }}
          style={{ height: '100%' }}
          expandable={{
            expandedRowRender: renderCollapsableRow,
            expandIcon: ({ expanded, onExpand, record }) => (
              <div
                style={{ width: '40px', cursor: 'pointer' }}
                onClick={(e) => onExpand(record, e)}
              >
                {expanded ? (
                  <img src={Icons.chevronBottomIcon} alt="expand" />
                ) : (
                  <img src={Icons.chevronRightIcon} alt="expand" />
                )}
              </div>
            ),
            expandRowByClick: true,
          }}
        />
      </div>
    </div>
  );
}

export default DataTable;
