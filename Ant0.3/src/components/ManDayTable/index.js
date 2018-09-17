import React, { PureComponent } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

class ManDayTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { list, pagination }, loading } = this.props;

    const columns = [
      {
        title: 'Start Date',
        dataIndex: 'Start Date',
        sorter: true,
      },
      {
        title: 'Due Date',
        dataIndex: 'Due Date',
        sorter: true,
      },
      {
        title: 'Release Date',
        dataIndex: 'Release Date',
        sorter: true,
      },
      {
        title: '产品线',
        dataIndex: '产品线',
        sorter: true,
      },
      {
        title: 'Story数量',
        dataIndex: 'Story数量',
        align: 'right',
      },
      {
        title: 'Story估时人天',
        dataIndex: 'Story估时人天',
        align: 'right',
      },
      {
        title: '交付/人天警戒值上限',
        dataIndex: '交付/人天警戒值上限',
        align: 'right',
      },
      {
        title: '交付/人天',
        dataIndex: '交付/人天',
        align: 'right',
      },
      {
        title: '交付/人天警戒值下限',
        dataIndex: '交付/人天警戒值下限',
        align: 'right',
      },
      {
        title: '库存人天',
        dataIndex: '库存人天',
        align: 'right',
      },
      {
        title: '剩余天数',
        dataIndex: '剩余天数',
        align: 'right',
      },
      {
        title: '人数',
        dataIndex: '人数',
        align: 'right',
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.report}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default ManDayTable;
