import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ report, loading }) => ({
  report,
  loading: loading.models.report,
}))
@Form.create()
export default class Check extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/chk',
    });
  }

  handleChk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/chk',
    });
  }

  render() {
    const { report: { data } } = this.props;

    return (
      <PageHeaderLayout title="check api server">
        <Card bordered={false}>
          <Button icon="refresh" type="primary" onClick={this.handleChk}>
            check
          </Button>
          <div>
            {JSON.stringify(data)}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
