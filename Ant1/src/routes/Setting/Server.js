import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  DatePicker,
  Table,
  Divider,
  Badge,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Server.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const badgeMap = {
  test: 'default',
  insert: 'processing',
  update: 'success',
  delete: 'warning',
};

const statusMap = {
  test: '测试',
  insert: '新增',
  update: '更改',
  delete: '删除',
};

const columns = [
  {
    title: '数据表',
    dataIndex: 'tableName',
    filters: [
      {
        text: 'auth',
        value: 'auth',
      },
      {
        text: 'user',
        value: 'user',
      },
      {
        text: 'voucher',
        value: 'voucher',
      },
    ],
    onFilter: (value, record) => record.tableName === value,
  },
  {
    title: '客户',
    dataIndex: 'appName',
  },
  {
    title: '用户',
    dataIndex: 'userName',
  },
  {
    title: '操作类型',
    dataIndex: 'opStr',
    filters: [
      {
        text: '测试',
        value: 'Test',
      },
      {
        text: '新增',
        value: 'Insert',
      },
      {
        text: '更改',
        value: 'Update',
      },
      {
        text: '删除',
        value: 'Delete',
      },
    ],
    onFilter: (value, record) => record.opStr === value,
    render: val => (
      <Fragment>
        <Badge status={badgeMap[val]} text={statusMap[val]} />
      </Fragment>
    ),
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },
  {
    title: '描述',
    dataIndex: 'summary',
  },
  {
    title: '操作时间',
    dataIndex: 'created',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
];

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Server extends PureComponent {
  state = {
    tabKey: 'log',
    expandForm: true,
    formValues: {
      url: 'log',
      pageNum: 1,
      pageSize: 20,
      dateStart: null,
      dateEnd: null,
      tableName: '',
      operation: -1,
      ip: '',
      appName: '',
      userName: '',
      summary: '',
      msg: 'Web管理后台',
    },
  };

  componentDidMount() {
    this.handleFormLog();
  }

  onTabChange = key => {
    this.setState({ tabKey: key });
  };

  callApi = (url, params) => {
    if (!url) return;

    const { dispatch } = this.props;
    dispatch({
      type: 'rule/' + url,
      payload: params,
    });
  };

  handleForm = (e, url) => {
    if (e) e.preventDefault();

    const { form } = this.props;
    if (!form) return;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      if (values.dateRange) {
        values.dateStart = values.dateRange[0].format('YYYY-MM-DD');
        values.dateEnd = values.dateRange[1].format('YYYY-MM-DD');
        values.dateRange = null;
      }

      this.setState({ formValues: values });
      if (url) this.callApi(url, values);
    });
  };

  handleFormChk = e => {
    this.handleForm(e, 'chk');
  };

  handleFormLog = e => {
    this.handleForm(e, 'log');
  };

  handleFormMsg = e => {
    this.handleForm(e, 'msg');
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();

    this.setState({ formValues: {} });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({ expandForm: !expandForm });
  };

  renderTabChk() {
    const {
      form,
      rule: { data },
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form onSubmit={this.handleFormChk} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'chk',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  chk
                </Button>
              </span>
            </Col>
          </Row>
        </Form>

        <Divider style={{ marginBottom: 32 }} />
        <div>Data: {JSON.stringify(data)}</div>
      </div>
    );
  }

  renderTabSimpleList() {
    const {
      form,
      rule: { data },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleFormLog} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'log',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="数据表">
                {getFieldDecorator('tableName')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">APP Key</Option>
                    <Option value="1">用户管理</Option>
                    <Option value="1">面部融合</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="客户端">
                {getFieldDecorator('appName', {
                  initialValue: formValues.appName,
                })(<Input placeholder="请输入名称" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a>
              </span>
            </Col>
          </Row>
        </Form>

        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.tableList}>
          <Table
            pagination={false}
            loading={loading}
            dataSource={(data || {}).list}
            columns={columns}
          />
        </div>
      </div>
    );
  }

  renderTabAdvancedList() {
    const {
      form,
      rule: { data },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleFormLog} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'log',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="数据表">
                {getFieldDecorator('tableName')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">APP Key</Option>
                    <Option value="1">用户管理</Option>
                    <Option value="1">面部融合</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="客户端">
                {getFieldDecorator('appName', {
                  initialValue: formValues.appName,
                })(<Input placeholder="请输入名称" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="用户">
                {getFieldDecorator('userName', {
                  initialValue: formValues.useName,
                })(<Input placeholder="请输入名称" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="操作类型">
                {getFieldDecorator('operation')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">增加</Option>
                    <Option value="1">修改</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="IP地址">
                {getFieldDecorator('ip', {
                  initialValue: formValues.ip,
                })(<Input placeholder="请输入IP" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="描述">
                {getFieldDecorator('summary', {
                  initialValue: formValues.summary,
                })(<Input placeholder="请输入关键字" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="起止日期">
                {getFieldDecorator('dateRange')(
                  <RangePicker
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD"
                    placeholder={['开始日期', '结束日期']}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="页面序号">
                {getFieldDecorator('pageNum', {
                  initialValue: formValues.pageNum,
                })(
                  <InputNumber
                    defaultValue={2}
                    min={1}
                    style={{ width: '100%' }}
                    placeholder="请输入数字"
                  />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="页面大小">
                {getFieldDecorator('pageSize', {
                  initialValue: formValues.pageSize,
                })(
                  <InputNumber
                    defaultValue={9}
                    min={1}
                    max={30}
                    style={{ width: '100%' }}
                    placeholder="请输入数字1-30"
                  />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </span>
            </Col>
          </Row>
        </Form>

        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.tableList}>
          <Table
            pagination={false}
            loading={loading}
            dataSource={(data || {}).list}
            columns={columns}
          />
        </div>
      </div>
    );
  }

  renderTabLog() {
    const { expandForm } = this.state;
    return expandForm ? this.renderTabAdvancedList() : this.renderTabSimpleList();
  }

  renderTabMsg() {
    const {
      form,
      rule: { data },
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleFormMsg} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'msg',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="发送消息">
                {getFieldDecorator('msg', {
                  initialValue: formValues.msg,
                })(<Input placeholder="Message to send" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  msg
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  Reset
                </Button>
              </span>
            </Col>
          </Row>
        </Form>

        <Divider style={{ marginBottom: 32 }} />
        <div>Data: {JSON.stringify(data)}</div>
      </div>
    );
  }

  render() {
    const { tabKey } = this.state;

    const tabKeyList = [
      {
        key: 'log',
        tab: '系统日志',
      },
      {
        key: 'chk',
        tab: '服务测试',
      },
    ];

    const tabList = {
      log: <div className={styles.tableListForm}>{this.renderTabLog()}</div>,
      chk: <div className={styles.tableListForm}>{this.renderTabChk()}</div>,
    };

    return (
      <PageHeaderLayout title="">
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={tabKeyList}
          defaultActiveTabKey={tabKey}
          onTabChange={this.onTabChange}
        >
          {tabList[tabKey]}
        </Card>
      </PageHeaderLayout>
    );
  }
}
