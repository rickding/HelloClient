import request from '@/utils/request';

export async function chk() {
  return request('http://localhost:8011/chk');
}
