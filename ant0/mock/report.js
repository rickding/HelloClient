import request from '../src/utils/request';

const dataList = [];
for (let i = 0; i < 3; i += 1) {
  dataList.push({
    key: i,
    'Story数量': '3',
    '产品线': 'APP',
    '交付/人天': '0.086',
    '交付/人天警戒值下限': '0.2',
    '库存人天': '35',
    '剩余天数': '5',
    '交付/人天警戒值上限': '0.4',
    'Due Date': '2018-01-27',
    'Story估时人天': '8.281',
    '人数': '7',
  });
}

function findReportData(dataArr, reportName) {
  for (let i = 0; i < dataArr.length; i += 1) {
    const report = dataArr[i];
    if (report.name === reportName) {
      for (let j = 0; j < report.data.length; j += 1) {
        report.data[j].key = j;
      }
      return report.data;
    }
  }
}

function getReportData(req, res, reportName) {
  const headers = {
    'X-Parse-Application-Id': 'myAppId',
    'X-Parse-Master-Key': 'myMasterKey',
  };
  const promise = request('http://192.168.20.161:1337/parse/classes/report_data', { headers });
  promise.then((data) => {
    const report = findReportData(data.results, reportName);
    res.json({
      reportName,
      url: promise.url,
      msg: data.results.length,
      list: [...report],
      pagination: {
        total: 1,
        pageSize: report.length,
        current: 1,
      },
    });
  }).catch((e) => {
    res.json({
      reportName,
      url: promise.url,
      error: e,
      list: [...dataList],
      pagination: {
        total: 1,
        pageSize: 10,
        current: 1,
      },
    });
  });
}

export const getWeeklyRelease = (req, res) => {
  getReportData(req, res, '人天交付运营能力_人天交付运营能力');
};

export const getWeeklyReleaseManDay = (req, res) => {
  getReportData(req, res, '人天交付运营能力_人力库存');
};

export const getWeeklyStartPlan = (req, res) => {
  getReportData(req, res, '计划开始_计划开始');
};

export const getWeeklyStartPlanManDay = (req, res) => {
  getReportData(req, res, '计划开始_人力库存');
};

export const getWeeklyReleasePlan = (req, res) => {
  getReportData(req, res, '计划交付_计划交付');
};

export const getWeeklyReleasePlanManDay = (req, res) => {
  getReportData(req, res, '计划交付_人力库存');
};

export const getReleasePlan = (req, res) => {
  getReportData(req, res, '未完成开发_未完成开发');
};

export const getReleasePlanManDay = (req, res) => {
  getReportData(req, res, '未完成开发_人力库存');
};

export const updateReportData = (req, res) => {
  const promise = request('http://192.168.20.161:8011/report/');
  promise.then((data) => {
    res.json({
      url: promise.url,
      msg: data,
    });
  }).catch((e) => {
    res.json({
      url: promise.url,
      error: e,
    });
  });
};

export const chkServer = (req, res) => {
  const promise = request('http://192.168.20.161:8011/chk');
  promise.then((data) => {
    res.send({
      url: promise.url,
      msg: data,
    });
  }).catch((e) => {
    res.send({
      url: promise.url,
      error: e,
    });
  });
};

export default {
  chkServer,
  updateReportData,
  getWeeklyRelease,
  getWeeklyReleaseManDay,
  getWeeklyStartPlan,
  getWeeklyStartPlanManDay,
  getWeeklyReleasePlan,
  getWeeklyReleasePlanManDay,
  getReleasePlan,
  getReleasePlanManDay,
};
