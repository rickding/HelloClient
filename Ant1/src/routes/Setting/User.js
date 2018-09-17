import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Button, Input, InputNumber, Select, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Server.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class User extends PureComponent {
  state = {
    tabKey: 'list',
    formValues: {
      url: '',
      pageNum: 1,
      pageSize: 3,
      appName: 'web_admin',
      key: 'TEST20283178435468066920',
      secret: 'a2ec6728-9a05-11e8-8af7-e0d55e8d80e2',
      accessToken: '',
      name: 'web_admin',
      password: 'asdfqwer',
      permission: 0,
      userToken: '',
    },
  };

  componentDidMount() {
    this.handleToken();
  }

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

      this.setState({
        formValues: values,
      });

      if (url) this.callApi(url, values);
    });
  };

  handleToken = () => {
    this.handleForm(null, 'fetch');
  };

  handleValid = () => {
    this.handleForm(null, 'fetch');
  };

  handleAddAuth = e => {
    this.handleForm(e, 'fetch');
  };

  handleFormAuth = e => {
    this.handleForm(e, 'fetch');
  };

  handleLogin = () => {
    this.handleForm(null, 'fetch');
  };

  handleLogout = () => {
    this.handleForm(null, 'fetch');
  };

  handleAddUser = e => {
    this.handleForm(e, 'fetch');
  };

  handleFormUser = e => {
    this.handleForm(e, 'fetch');
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();

    this.setState({
      formValues: {},
    });
  };

  onTabChange = key => {
    this.setState({ tabKey: key });
  };

  renderTabAuth() {
    const {
      form,
      rule: { data },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;

    const statusInt = [{ k: -1, v: 'Test' }, { k: 0, v: '关闭' }, { k: 1, v: '运行中' }];
    const columns = [
      {
        title: '规则编号',
        dataIndex: 'no',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '查询次数',
        dataIndex: 'callNo',
        sorter: true,
        align: 'right',
        needTotal: true,
      },
      {
        title: 'statusStr',
        dataIndex: 'statusStr',
        filters: [
          {
            text: 'abc',
            value: 'abc',
          },
          {
            text: 'def',
            value: 'def',
          },
        ],
        onFilter: (value, record) => record.statusStr === value,
      },
      {
        title: 'statusInt',
        dataIndex: 'status',
        render(val) {
          for (let i = 0, len = statusInt.length; i < len; i += 1) {
            const item = statusInt[i];
            if (item.k === val) {
              return item.v;
            }
          }
          return val;
        },
        filters: [
          {
            text: statusInt[0].v,
            value: statusInt[0].k,
          },
          {
            text: statusInt[1].v,
            value: statusInt[1].k,
          },
          {
            text: statusInt[2].v,
            value: statusInt[2].k,
          },
        ],
        onFilter: (value, record) => record.statusInt.toString() === value,
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'disabled',
        render: val => (
          <Fragment>
            <a href="">{val ? '禁用' : '启用'}</a>
          </Fragment>
        ),
      },
    ];

    return (
      <div>
        <Form onSubmit={this.handleFormAuth} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'add',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="App Key">
                {getFieldDecorator('key', {
                  initialValue: formValues.key,
                })(<Input placeholder="App key" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="Secret">
                {getFieldDecorator('secret', {
                  initialValue: formValues.secret,
                })(<Input placeholder="App secret" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleToken}>token</Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <FormItem label="App名称">
                {getFieldDecorator('appName', {
                  initialValue: formValues.appName,
                })(<Input placeholder="App Name" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleAddAuth}>add key</Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <FormItem label="Access Token">
                {getFieldDecorator('accessToken', {
                  initialValue: formValues.accessToken,
                })(<Input placeholder="Token to verify" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleValid}>valid token</Button>
              </span>
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
                    placeholder="Page number"
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
                    max={10}
                    style={{ width: '100%' }}
                    placeholder="Page size"
                  />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  list key
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  Reset
                </Button>
              </span>
            </Col>
          </Row>
        </Form>

        <div>Data: {JSON.stringify(data)}</div>
        <br />
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

  renderTabUser() {
    const {
      form,
      rule: { data },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues } = this.state;

    const statusInt = [{ k: -1, v: 'Test' }, { k: 0, v: '关闭' }, { k: 1, v: '运行中' }];
    const columns = [
      {
        title: '规则编号',
        dataIndex: 'no',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '查询次数',
        dataIndex: 'callNo',
        sorter: true,
        align: 'right',
        needTotal: true,
      },
      {
        title: 'statusStr',
        dataIndex: 'statusStr',
        filters: [
          {
            text: 'abc',
            value: 'abc',
          },
          {
            text: 'def',
            value: 'def',
          },
        ],
        onFilter: (value, record) => record.statusStr === value,
      },
      {
        title: 'statusInt',
        dataIndex: 'status',
        render(val) {
          for (let i = 0, len = statusInt.length; i < len; i += 1) {
            const item = statusInt[i];
            if (item.k === val) {
              return item.v;
            }
          }
          return val;
        },
        filters: [
          {
            text: statusInt[0].v,
            value: statusInt[0].k,
          },
          {
            text: statusInt[1].v,
            value: statusInt[1].k,
          },
          {
            text: statusInt[2].v,
            value: statusInt[2].k,
          },
        ],
        onFilter: (value, record) => record.statusInt.toString() === value,
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'disabled',
        render: val => (
          <Fragment>
            <a href="">{val ? '禁用' : '启用'}</a>
            <Divider type="vertical" />
            <a href="">{val ? '重置密码' : ''}</a>
          </Fragment>
        ),
      },
    ];

    return (
      <div>
        <Form onSubmit={this.handleFormUser} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'user',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="用户名">
                {getFieldDecorator('name', {
                  initialValue: formValues.name,
                })(<Input placeholder="User name" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="密码">
                {getFieldDecorator('password', {
                  initialValue: formValues.password,
                })(<Input placeholder="Password" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleLogin}>login</Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <FormItem label="用户权限">
                {getFieldDecorator('permission', {
                  initialValue: 'User',
                })(
                  <Select placeholder="Permission" style={{ width: '100%' }}>
                    <Option value="-1">Test</Option>
                    <Option value="0">User</Option>
                    <Option value="1">Admin</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleAddUser}>add user</Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24} />
            <Col md={8} sm={24}>
              <FormItem label="用户Token">
                {getFieldDecorator('userToken', {
                  initialValue: formValues.userToken,
                })(<Input placeholder="User token" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleLogout}>logout</Button>
              </span>
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
                    placeholder="Page number"
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
                    max={10}
                    style={{ width: '100%' }}
                    placeholder="Page size"
                  />
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  list user
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  Reset
                </Button>
              </span>
            </Col>
          </Row>
        </Form>

        <div>Data: {JSON.stringify(data)}</div>
        <br />
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

  render() {
    const { tabKey } = this.state;

    const tabKeyList = [
      {
        key: 'auth',
        tab: 'App Key',
      },
      {
        key: 'user',
        tab: 'User',
      },
    ];

    const tabList = {
      auth: <div className={styles.tableListForm}>{this.renderTabAuth()}</div>,
      user: <div className={styles.tableListForm}>{this.renderTabUser()}</div>,
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
