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

const badgeMap = ['success', 'error'];
const statusMap = ['启用', '禁用'];

const columns = [
  {
    title: '客户',
    dataIndex: 'name',
  },
  {
    title: 'APP Key',
    dataIndex: 'appKey',
  },
  {
    title: '状态',
    dataIndex: 'isEnabled',
    filters: [
      {
        text: statusMap[0],
        value: 0,
      },
      {
        text: statusMap[1],
        value: 1,
      },
    ],
    onFilter: (value, record) => (record.isEnabled ? 0 : 1) === value,
    render(val) {
      const v = val ? 0 : 1;
      return (
        <Fragment>
          <Badge status={badgeMap[v]} text={statusMap[v]} />
          <Divider type="vertical" />
          {val && <a href="disable">禁用</a>}
          {!val && <a href="enable">启用</a>}
        </Fragment>
      );
    },
  },
  {
    title: '最后更新',
    dataIndex: 'updated',
    sorter: true,
    render: val => <span>{moment(val).format('YY-MM-DD HH:mm:ss')}</span>,
  },
];

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Auth extends PureComponent {
  state = {
    tabKey: 'list',
    expandForm: false,
    formValues: {
      url: 'list',
      pageNum: 1,
      pageSize: 10,
      dateStart: null,
      dateEnd: null,
      appName: 'web_admin',
      key: 'TEST20283178435468066920',
      secret: 'a2ec6728-9a05-11e8-8af7-e0d55e8d80e2',
      accessToken: '',
      isEnabled: null,
      description: '',
    },
  };

  componentDidMount() {
    this.handleFormList();
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

  handleToken = () => {
    this.handleForm(null, 'add');
  };

  handleValid = () => {
    this.handleForm(null, 'valid');
  };

  handleFormMisc = e => {
    this.handleForm(e, 'token');
  };

  handleFormList = e => {
    this.handleForm(e, 'list');
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
        <Form onSubmit={this.handleFormList} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'list',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="启用状态">
                {getFieldDecorator('isEnabled')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">禁用</Option>
                    <Option value="1">启用</Option>
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
        <Form onSubmit={this.handleFormList} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'list',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="启用状态">
                {getFieldDecorator('isEnabled')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">启用</Option>
                    <Option value="1">禁用</Option>
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
              <FormItem label="描述">
                {getFieldDecorator('description', {
                  initialValue: formValues.description,
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
            <Col md={8} sm={24}>
              <FormItem label="App Key">
                {getFieldDecorator('key', {
                  initialValue: formValues.key,
                })(<Input placeholder="请输入Key" maxLength={64} />)}
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

  renderTabList() {
    const { expandForm } = this.state;
    return expandForm ? this.renderTabAdvancedList() : this.renderTabSimpleList();
  }

  renderTabMisc() {
    const {
      form,
      rule: { data },
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleFormMisc} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'token',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="App Key">
                {getFieldDecorator('key', {
                  initialValue: formValues.key,
                })(<Input placeholder="请输入Key" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="Secret">
                {getFieldDecorator('secret', {
                  initialValue: formValues.secret,
                })(<Input placeholder="请输入secret" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  获取Token
                </Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <FormItem label="Access Token">
                {getFieldDecorator('accessToken', {
                  initialValue: formValues.accessToken,
                })(<Input placeholder="请输入验证Token" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleValid}>验证Token</Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <FormItem label="客户端">
                {getFieldDecorator('appName', {
                  initialValue: formValues.appName,
                })(<Input placeholder="请输入名称" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleToken}>新增</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
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
        key: 'list',
        tab: '查询管理',
      },
      {
        key: 'misc',
        tab: '新增授权',
      },
    ];

    const tabList = {
      list: <div className={styles.tableListForm}>{this.renderTabList()}</div>,
      misc: <div className={styles.tableListForm}>{this.renderTabMisc()}</div>,
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
