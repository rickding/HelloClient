import request from '@/utils/request';
import { getApiUrl } from '@/utils/setting';

export async function getApi(url) {
  return callApi(url, 'GET', null);
}

export async function postApi(url, params) {
  return callApi(url, 'POST', params);
}

export async function callApi(url, method, params) {
  const options = { expirys: 1 };
  if (method === 'POST') {
    options.method = method;
  }
  if (method !== 'POST' && params) {
    options.body = params;
  }

  if (url !== 'chk' && url !== 'token') {
    options.headers = {
      access_token: (params || {}).accessToken || 'kqZ5LdQ+c8UI9kcCu67vQQ=='
    }

    if (url !== 'login') {
      options.headers.user_token = (params || {}).userToken || 'xmESjXci0yQ4+XSTzECtSA==';
    }
  }

  const apiUrl = getApiUrl() || 'http://localhost:8011/';
  return request(apiUrl + url, options);
}

export async function chk() {
  return getApi('chk');
}

export async function log(params) {
  return postApi('log', params);
}

export async function msg(params) {
  return postApi('msg', params);
}
