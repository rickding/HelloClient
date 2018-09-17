import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 6; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 3 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: i % 4, // Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),

    code: `F18${Math.floor(Math.random() * 100000000000)}`,
    appName: `客KEY${(Math.floor(Math.random() * 10) % 2) + 1}`,
    statusStr: i % 4 === 3 ? 'finished' : 'waiting',
    isFailed: i % 2 === 0,
    isCallback: i % 2 === 0,
    processCount: (Math.floor(Math.random() * 10) % 4) + 1,
    updated: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    urlFacial: i % 2 === 0 ? 'ssss' : null,
    urlModel: i % 2 === 0 ? 'aaa' : '',

    name: `user_obj_${i + 1}.zip`,
    appKey: `F18${Math.floor(Math.random() * 100000000000)}`,
    isEnabled: i % 2 === 0,

    tableName: i % 3 === 2 ? 'voucher' : i % 3 === 1 ? 'user' : 'auth',
    userName: `管理员${(i % 3) + 1}`,
    opStr: i % 2 === 1 ? 'insert' : 'update',
    ip: `${Math.floor(Math.random() * 255) % 255}.22.32.${Math.floor(Math.random() * 255) % 255}`,
    summary: `增加修改${(i % 2) + 1}`,
    created: new Date(`2017-07-${Math.floor(i / 2) + 1}`),

    fileType: Math.floor(Math.random() * 10) % 2 === 0 ? 'user' : 'processed',
    fileLocation: Math.floor(Math.random() * 10) % 1 === 0 ? 'ddservice' : 'aliyun',
    downloadCount: Math.floor(Math.random() * 10) % 6,
    md5: `${Math.floor(Math.random() * 1000000000000000)}`,
    url: 'download',
  });
}

export function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    aaa: params,
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.pageNum, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getRule,
  postRule,
};
