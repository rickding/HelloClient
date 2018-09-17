import request from '@/utils/request';

export async function chk(params) {
  const ret = request('http://localhost:8011/chk');
  // ret.then((resp) => {
  //   alert('resp: ' + resp)
  // })
  // .catch(err => {
  //   alert('error: ' + err)
  // })
  return ret;
}
