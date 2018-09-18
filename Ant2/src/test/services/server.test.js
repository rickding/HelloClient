import request from '@/utils/request';

describe('test server api', () => {
  it('chk', () => {
    const ret = request('http://localhost:8011/chk');
    console.log('request returns:' + ret)

    ret.then((resp) => {
      console.log('resp: ' + resp)
      expect(resp).toBe('ok');
    })
    .catch(err => {
      console.log('error: ' + err)
      expect(err).toBe('err');
    })
  });
});
