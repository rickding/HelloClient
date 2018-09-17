import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class TabList extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'server':
        dispatch(routerRedux.push(`${match.url}/server`));
        break;
      case 'auth':
        dispatch(routerRedux.push(`${match.url}/auth`));
        break;
      case 'user':
        dispatch(routerRedux.push(`${match.url}/user`));
        break;
      case 'file':
        dispatch(routerRedux.push(`${match.url}/file`));
        break;
      case 'facet':
        dispatch(routerRedux.push(`${match.url}/facet`));
        break;
      default:
        break;
    }
  };

  render() {
    const tabList = [
      {
        key: 'server',
        tab: '服务器',
      },
      {
        key: 'auth',
        tab: '认证授权',
      },
      {
        key: 'user',
        tab: '用户管理',
      },
      {
        key: 'file',
        tab: '存储服务',
      },
      {
        key: 'facet',
        tab: '面部融合',
      },
    ];

    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        title="Setting"
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
        </Switch>
      </PageHeaderLayout>
    );
  }
}
