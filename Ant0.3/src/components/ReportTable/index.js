import React, { PureComponent } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

class ReportTable extends PureComponent {
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
        title: 'Due Date',
        dataIndex: 'Due Date',
        sorter: true,
      },
      {
        title: 'Resolve Date',
        dataIndex: 'Resolve Date',
        sorter: true,
      },
      {
        title: 'Release Date',
        dataIndex: 'Release Date',
        sorter: true,
      },
      {
        title: 'Start Date',
        dataIndex: 'Start Date',
        sorter: true,
      },
      {
        title: 'Team Key',
        dataIndex: 'Team Key',
        sorter: true,
      },
      {
        title: 'Team Name',
        dataIndex: 'Team Name',
        sorter: true,
      },
      {
        title: 'Issue Key',
        dataIndex: 'Issue Key',
        sorter: true,
      },
      {
        title: 'Issue ID',
        dataIndex: 'Issue ID',
        sorter: true,
      },
      {
        title: 'Issue Type',
        dataIndex: 'Issue Type',
        sorter: true,
      },
      {
        title: 'Status',
        dataIndex: 'Status',
        sorter: true,
      },
      {
        title: 'Resolution',
        dataIndex: 'Resolution',
        sorter: true,
      },
      {
        title: 'Project',
        dataIndex: 'Project',
        sorter: true,
      },
      {
        title: 'Estimation Man-day',
        dataIndex: 'Estimation Man-day',
        align: 'right',
      },
      {
        title: '到期日',
        dataIndex: '到期日',
        sorter: true,
      },
      {
        title: '解决',
        dataIndex: '解决',
        sorter: true,
      },
      {
        title: 'Custom field (实际上线日期)',
        dataIndex: 'Custom field (实际上线日期)',
        sorter: true,
      },
      {
        title: 'Custom field (计划开始日期)',
        dataIndex: 'Custom field (计划开始日期)',
        sorter: true,
      },
      {
        title: 'Project key',
        dataIndex: 'Project key',
        sorter: true,
      },
      {
        title: 'Project name',
        dataIndex: 'Project name',
        sorter: true,
      },
      {
        title: 'Issue key',
        dataIndex: 'Issue key',
        sorter: true,
      },
      {
        title: 'Issue id',
        dataIndex: 'Issue id',
        sorter: true,
      },
      {
        title: '问题类型',
        dataIndex: '问题类型',
        sorter: true,
      },
      {
        title: '状态',
        dataIndex: '状态',
        sorter: true,
      },
      {
        title: '解决结果',
        dataIndex: '解决结果',
        sorter: true,
      },
      {
        title: 'Custom field (所属项目)',
        dataIndex: 'Custom field (所属项目)',
        sorter: true,
      },
      {
        title: '剩余时间',
        dataIndex: '剩余时间',
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

export default ReportTable;
