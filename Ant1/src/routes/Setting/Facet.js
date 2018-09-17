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
  waiting: 'default',
  preparing: 'warning',
  processing: 'processing',
  finished: 'success',
};

const statusMap = {
  waiting: '等待',
  preparing: '准备',
  processing: '处理',
  finished: '结束',
};

const columns = [
  {
    title: '单据编号',
    dataIndex: 'code',
  },
  {
    title: '客户',
    dataIndex: 'appName',
  },
  {
    title: '状态',
    dataIndex: 'statusStr',
    filters: [
      {
        text: statusMap.waiting,
        value: 'waiting',
      },
      {
        text: statusMap.preparing,
        value: 'preparing',
      },
      {
        text: statusMap.processing,
        value: 'processing',
      },
      {
        text: statusMap.finished,
        value: 'finished',
      },
    ],
    onFilter: (value, record) => record.statusStr === value,
    render: val => (
      <Fragment>
        <Badge status={badgeMap[val]} text={statusMap[val]} />
        {statusMap[val] === statusMap.finished && (
          <span>
            <Divider type="vertical" />
            <a href="{val}">重新处理</a>
          </span>
        )}
      </Fragment>
    ),
  },
  {
    title: '已失败',
    dataIndex: 'isFailed',
    filters: [
      {
        text: '否',
        value: false,
      },
      {
        text: '是',
        value: true,
      },
    ],
    onFilter: (value, record) => record.isFailed === value,
    render(val) {
      return val ? <Badge status="error" text="是" /> : '';
    },
  },
  {
    title: '已回调',
    dataIndex: 'isCallback',
    render: val => <span>{val ? '是' : ''}</span>,
    filters: [
      {
        text: '否',
        value: false,
      },
      {
        text: '是',
        value: true,
      },
    ],
    onFilter: (value, record) => record.isCallback === value,
  },
  {
    title: '用户数据',
    dataIndex: 'urlFacial',
    render: val => (
      <Fragment>
        {val &&
          val.length > 0 && (
            <a href="{val}">
              下载 <Icon type="download" />
            </a>
          )}
      </Fragment>
    ),
  },
  {
    title: '处理结果',
    dataIndex: 'urlModel',
    render: val => (
      <Fragment>
        {val &&
          val.length > 0 && (
            <a href="{val}">
              下载 <Icon type="download" />
            </a>
          )}
      </Fragment>
    ),
  },
  {
    title: '处理次数',
    dataIndex: 'processCount',
    sorter: true,
    align: 'right',
    needTotal: true,
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
export default class Facet extends PureComponent {
  state = {
    tabKey: 'list',
    expandForm: false,
    formValues: {
      url: 'list',
      pageNum: 1,
      pageSize: 30,
      dateStart: null,
      dateEnd: null,
      appName: '',
      code: '',
      urlFacial: '',
      urlModel: '',
      urlCallback: '',
      isFailed: null,
      failReason: '',
      isCallback: null,
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

  handleInfo = () => {
    this.handleForm(null, 'info');
  };

  handleCallback = () => {
    this.handleForm(null, 'callback');
  };

  handleFormMisc = e => {
    this.handleForm(e, 'process');
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
              <FormItem label="单据编号">
                {getFieldDecorator('code', {
                  initialValue: formValues.code,
                })(<Input placeholder="请输入单据编号" maxLength={64} />)}
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
              <FormItem label="单据编号">
                {getFieldDecorator('code', {
                  initialValue: formValues.code,
                })(<Input placeholder="请输入单据编号" maxLength={64} />)}
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
              <FormItem label="客户端">
                {getFieldDecorator('appName', {
                  initialValue: formValues.appName,
                })(<Input placeholder="请输入名称" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="处理结果">
                {getFieldDecorator('isFailed')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">成功</Option>
                    <Option value="1">失败</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="错误原因">
                {getFieldDecorator('failReasion', {
                  initialValue: formValues.failReason,
                })(<Input placeholder="请输入关键字" maxLength={256} />)}
              </FormItem>
            </Col>
            {/* <Col md={8} sm={24}>
              <FormItem label="是否回调">
                {getFieldDecorator('isCallback')(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value="0">未回调</Option>
                    <Option value="1">已回调</Option>
                  </Select>
                )}
              </FormItem>
            </Col> */}
            <Col md={8} sm={24}>
              <FormItem label="回调地址">
                {getFieldDecorator('urlCallback', {
                  initialValue: formValues.urlCallback,
                })(<Input placeholder="请输入回调URL" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="用户数据地址">
                {getFieldDecorator('urlFacial', {
                  initialValue: formValues.urlFacial,
                })(<Input placeholder="请输入数据URL" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="处理结果地址">
                {getFieldDecorator('urlModel', {
                  initialValue: formValues.urlModel,
                })(<Input placeholder="请输入结果URL" maxLength={256} />)}
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
            initialValue: 'info',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="用户数据地址">
                {getFieldDecorator('urlFacial', {
                  initialValue: formValues.urlFacial,
                })(<Input placeholder="请输入数据URL" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  处理Obj
                </Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="单据编号">
                {getFieldDecorator('code', {
                  initialValue: formValues.code,
                })(<Input placeholder="请输入单据编号" maxLength={64} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleInfo}>查询状态</Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="回调地址">
                {getFieldDecorator('urlCallback', {
                  initialValue: formValues.urlCallback,
                })(<Input placeholder="请输入回调URL" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleCallback}>回调客户端</Button>
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
        tab: '模拟测试',
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
