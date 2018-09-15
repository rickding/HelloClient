import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ report, loading }) => ({
  report,
  loading: loading.models.report,
}))
@Form.create()
export default class UpdateData extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/chk',
    });
  }
  
  handleDataUpdate = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/updateData',
    });
  }

  render() {
    const { report: { data } } = this.props;

    return (
      <PageHeaderLayout title="更新数据：周五运行更新report_data，其他时间将更新测试数据表report_data_test。">
        <Card bordered={false}>
          <Button icon="update" type="primary" onClick={this.handleDataUpdate}>
            更新数据
          </Button>
          <div>
            {JSON.stringify(data)}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
