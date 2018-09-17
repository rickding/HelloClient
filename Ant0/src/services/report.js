import request from '../utils/request';

export async function updateReportData() {
  return request('/api/report/update_data');
}

export async function chk() {
  return request('/api/report/chk');
  // const promise = request('http://192.168.20.161:8011/chk', { mode: 'no-cors' });
  // promise.then((data) => {
  //   return ({
  //     url: promise.url,
  //     msg: data,
  //   });
  // }).catch((e) => {
  //   return ({
  //     url: promise.url,
  //     error: e,
  //   });
  // });
}

export async function weeklyRelease() {
  return request('/api/report/weekly_release');
}

export async function weeklyReleaseManday() {
  return request('/api/report/weekly_release_manday');
}

export async function weeklyStartPlan() {
  return request('/api/report/weekly_start_plan');
}

export async function weeklyStartPlanManday() {
  return request('/api/report/weekly_start_plan_manday');
}

export async function weeklyReleasePlan() {
  return request('/api/report/weekly_release_plan');
}

export async function weeklyReleasePlanManday() {
  return request('/api/report/weekly_release_plan_manday');
}

export async function releasePlan() {
  return request('/api/report/release_plan');
}

export async function releasePlanManday() {
  return request('/api/report/release_plan_manday');
}
