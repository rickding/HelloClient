import { md5, md5b64, b64dec, b64enc } from '@/utils/EncUtil';

describe('test EncUtil', () => {
  it('md5', () => {
    const key = 'test_set_get_value';
    const value = md5(key);
    const valueB64 = b64enc(key)
    console.log('str: ' + key + ', md5: ' + value + ', b64: ' + valueB64);

    expect(md5b64(key)).toEqual(md5(valueB64))
    expect(b64dec(valueB64)).toEqual(key)
  });
});