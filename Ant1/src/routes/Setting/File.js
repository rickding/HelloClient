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
  user: 'default',
  processed: 'success',
};

const statusMap = {
  user: '用户Obj',
  processed: '生成模型',
};

const badgeLocationMap = {
  ddservice: 'processing',
  aliyun: 'warning',
};

const fileLocationMap = {
  ddservice: 'DDS云服务',
  aliyun: '阿里云存储',
};

const columns = [
  {
    title: '客户端',
    dataIndex: 'appName',
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    filters: [
      {
        text: statusMap.user,
        value: 'user',
      },
      {
        text: statusMap.processed,
        value: 'processed',
      },
    ],
    onFilter: (value, record) => record.statusStr === value,
    render: val => <Badge status={badgeMap[val]} text={statusMap[val]} />,
  },
  {
    title: '存储位置',
    dataIndex: 'fileLocation',
    filters: [
      {
        text: fileLocationMap.ddservice,
        value: 'ddservice',
      },
      {
        text: fileLocationMap.aliyun,
        value: 'aliyun',
      },
    ],
    onFilter: (value, record) => record.statusStr === value,
    render: val => <Badge status={badgeLocationMap[val]} text={fileLocationMap[val]} />,
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '编号',
    dataIndex: 'code',
  },
  {
    title: '下载次数',
    dataIndex: 'downloadCount',
    sorter: true,
    align: 'right',
    needTotal: true,
  },
  {
    title: 'MD5',
    dataIndex: 'md5',
  },
  {
    title: '下载',
    dataIndex: 'url',
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
    title: '上传日期',
    dataIndex: 'created',
    sorter: true,
    render: val => <span>{moment(val).format('YY-MM-DD HH:mm:ss')}</span>,
  },
];

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class File extends PureComponent {
  state = {
    tabKey: 'list',
    expandForm: true,
    formValues: {
      url: 'list',
      pageNum: 1,
      pageSize: 30,
      dateStart: null,
      dateEnd: null,
      appName: '',
      code: '',
      name: '',
      fileType: 0,
      fileLocation: 0,
      file: '',
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

  handleDownload = () => {
    this.handleForm(null, 'download');
  };

  handleFormMisc = e => {
    this.handleForm(e, 'upload');
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

  renderTabList() {
    const {
      form,
      rule: { data },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;
    const { formValues, expandForm } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleFormList} layout="inline">
          {getFieldDecorator('url', {
            initialValue: 'list',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="客户端">
                {getFieldDecorator('appName', {
                  initialValue: formValues.appName,
                })(<Input placeholder="请输入名称" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="文件类型">
                {getFieldDecorator('fileType', {
                  initialValue: formValues.fileType,
                })(
                  <Select placeholder="不限" style={{ width: '100%' }}>
                    <Option value={0}>用户Obj</Option>
                    <Option value={1}>生成模型</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            {!expandForm && (
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
            )}
            {expandForm && (
              <Col md={8} sm={24}>
                <FormItem label="上传日期">
                  {getFieldDecorator('dateRange')(
                    <RangePicker
                      style={{ width: '100%' }}
                      format="YYYY-MM-DD"
                      placeholder={['开始日期', '结束日期']}
                    />
                  )}
                </FormItem>
              </Col>
            )}
          </Row>
          {expandForm && (
            <Fragment>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <FormItem label="存储位置">
                    {getFieldDecorator('fileLocation', {
                      initialValue: formValues.fileLocation,
                    })(
                      <Select placeholder="不限" style={{ width: '100%' }}>
                        <Option value={0}>DDS云服务</Option>
                        <Option value={1}>阿里云存储</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="文件编号">
                    {getFieldDecorator('code', {
                      initialValue: formValues.code,
                    })(<Input placeholder="请输入文件编号" maxLength={64} />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="文件名称">
                    {getFieldDecorator('name', {
                      initialValue: formValues.name,
                    })(<Input placeholder="请输入文件名称" maxLength={256} />)}
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
            </Fragment>
          )}
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
            initialValue: 'upload',
          })(<Input placeholder="url to call" hidden="true" />)}

          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="本地文件">
                {getFieldDecorator('file', {
                  initialValue: formValues.file,
                })(<Input placeholder="请选择本地文件" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  上传
                </Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="文件编号">
                {getFieldDecorator('code', {
                  initialValue: formValues.code,
                })(<Input placeholder="请输入文件编号" maxLength={256} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button onClick={this.handleDownload}>下载</Button>
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
        tab: '上传下载',
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
