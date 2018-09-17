import request from '../utils/request';

export async function chk() {
  return request('http://localhost:8011/chk', {
    method: 'GET',
  });
}

export async function postApi(url, params) {
  return request('http://localhost:8011/' + url, {
    method: 'POST',
    headers: {
      access_token: (params || {}).accessToken || 'kqZ5LdQ+c8UI9kcCu67vQQ==',
      user_token: (params || {}).userToken || 'xmESjXci0yQ4+XSTzECtSA==',
    },
    body: {
      ...params,
    },
  });
}

export async function log(params) {
  return postApi('log', params);
}

export async function msg(params) {
  return postApi('msg', params);
}
