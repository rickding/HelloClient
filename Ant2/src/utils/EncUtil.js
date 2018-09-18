import crypto from 'crypto';

const { Buffer } = require('buffer/');

// md5: https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501504929883d11d84a1541c6907eefd792c0da51000
export function md5b64(str) {
  return md5(b64enc(str));
}

export function b64md5(str) {
  return b64enc(md5(str));
}

export function md5(str) {
  if (!str) return null;

  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

// base64: http://wangbaiyuan.cn/adding-base64-react-native-support.html
export function b64enc(str) {
  if (!str) return null;
  return Buffer.from(str).toString('base64');
}

export function b64dec(str) {
  if (!str) return null;
  return Buffer.from(str, 'base64').toString();
}
