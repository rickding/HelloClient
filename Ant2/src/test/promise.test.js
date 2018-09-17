// callback example
function callback() {
  console.log('Done');
}

console.log('before setTimeout()');
setTimeout(callback, 1000); // 1 seconds to callback()
console.log('after setTimeout');

// promise() example
function test(resolve, reject) {
  const timeOut = Math.random() * 2;
  console.log('set timeout to: ' + timeOut + ' seconds');
  setTimeout(() => {
    if (timeOut < 1) {
      console.log('call resolve()...');
      resolve('200 OK');
    } else {
      console.log('call reject()...');
      reject('timeout in ' + timeOut + ' seconds.');
    }
  }, timeOut * 1000);
}

const p1 = new Promise(test);
const p2 = p1.then(result => {
  console.log('Success: ' + result);
});
p2.catch(reason => {
  console.log('Fail: ' + reason);
});

new Promise(test)
  .then(result => {
    console.log('Success: 2, ' + result);
  })
  .catch(reason => {
    console.log('Fail: 2, ' + reason);
  });

// continuous Promise()
new Promise((resolve, reject) => {
  console.log('Start new promise...');
  const timeOut = Math.random() * 2;
  console.log('Set timeout to: ' + timeOut + ' seconds');

  setTimeout(() => {
    if (timeOut < 1) {
      console.log('Call resolve()...');
      resolve('200 OK');
    } else {
      console.log('Call reject()...');
      reject(new Error('Timeout in ' + timeOut + ' seconds'));
    }
  }, timeOut * 1000);
})
  .then(r => {
    console.log('Done: ' + r);
  })
  .catch(r => {
    console.log('Failed: ' + r);
  });

// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000
// https://www.cnblogs.com/laixiangran/p/5060922.html
describe('test promise', () => {
  it('Promise is supported!', () => {
    // 'use strict';
    const p = new Promise(() => {});
    console.log('Promise() is supported!');
    expect(p).not.toBe(null);
  });
});
