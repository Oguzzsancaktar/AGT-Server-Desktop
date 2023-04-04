import React, { useEffect, useState } from 'react';
import { Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import getIcon from 'constants/icons';
import { getOpcClientObjecthildrens, getOpcClientObjects } from 'api/services';

interface DataType {
  key: string;
  nodeId: string;
  name: string;
  hasChild: string;
}

function ChildCollapse({ record }: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getOpcClientObjecthildrens(record.nodeId);
      setData(data);
    }
    fetchData();
  }, [record]);

  return (
    <Collapse
      style={{ marginLeft: '40px' }}
      expandIcon={({ isActive }) => (
        <img
          src={isActive ? getIcon('chevronBottom') : getIcon('chevronRight')}
          alt="c"
        />
      )}
    >
      {data.map((d) => {
        return (
          <Collapse.Panel header={d.name} key={d.nodeId}>
            {!d.hasChild ? (
              <div className="flex-row justify-between items-center">
                <p>{d.nodeId}</p>

                <div className="flex-row">
                  <span
                    className="flex-row items-center justify-center"
                    style={{ width: '140px' }}
                  >
                    <img
                      src={getIcon('info')}
                      alt="data"
                      style={{ marginRight: '20px' }}
                    />
                  </span>
                  <span
                    className="flex-row items-center justify-center"
                    style={{ width: '140px' }}
                  >
                    <img
                      src={getIcon('cloudGray')}
                      alt="cloud"
                      style={{ marginLeft: '70px' }}
                    />
                  </span>
                </div>
              </div>
            ) : (
              <ChildCollapse record={d} />
            )}
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
}

const createExpandableRow = ({ expanded, onExpand, record }: any) => {
  return (
    <div
      style={{ width: '40px', cursor: 'pointer' }}
      onClick={(e) => onExpand(record, e)}
      aria-hidden="true"
    >
      {expanded ? (
        <img src={getIcon('chevronBottom')} alt="expand" />
      ) : (
        <img src={getIcon('chevronRight')} alt="expand" />
      )}
    </div>
  );
};

// Define the columns for the table
const columns: ColumnsType<DataType> = [
  {
    title: 'Machine',
    dataIndex: 'name',
  },
  {
    title: 'Data Information',
    className: 'column-money',
    align: 'right',
    width: '180px',
  },
  {
    title: 'Cloud Connection',
    align: 'right',
    width: '180px',
  },
];

// Define a function to render the collapsable row
const renderCollapsableRow = (record: any) => {
  return <ChildCollapse record={record} />;
};

// Define a function to render the table component
function DataTable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getOpcClientObjects();
      setTableData(data);
    }
    fetchData();
  }, []);

  return (
    <div
      className="wrapper h-full bg-white "
      style={{ paddingTop: '30px', paddingBottom: '30px' }}
    >
      <Table
        className="container h-full rounded text-darkBlue bordered border-darkBlue"
        columns={columns}
        dataSource={tableData.map((d, i) => {
          return {
            key: i.toString(),
            ...d,
            // dataInformation: <img src={getIcon('info')} alt="data" />,
            // cloudConnection: <img src={getIcon('cloudGray')} alt="cloud" />,
          };
        })}
        rowClassName="cursor-pointer"
        pagination={false}
        scroll={{ y: 'calc(100% - 55px)' }}
        style={{ height: '100%' }}
        expandable={{
          expandedRowRender: renderCollapsableRow,
          expandIcon: createExpandableRow,
          expandRowByClick: true,
        }}
      />
    </div>
  );
}

export default DataTable;
